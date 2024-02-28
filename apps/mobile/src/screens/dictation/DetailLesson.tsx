import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useSentenceQuery } from '@mobile/hooks/apis/useSentenceQuery';
import {
  setupPlayer,
  // tracks,
} from '@mobile/services/PlaybackService';
import ControlCenter from '@mobile/components/dictation/ControlCenter';
import SongInfo from '@mobile/components/dictation/SongInfo';
import SongSlider from '@mobile/components/dictation/AudioSlider';
import { useShortStoryLessonsQuery } from '@mobile/hooks/apis/useLessonQuery';
import { useSetupPlayer } from '@mobile/hooks/useSetupPlayer';
import { useActiveTrack } from '@mobile/hooks/useActiveTrack';
import { useDetailLesson } from '@mobile/hooks/apis/useDetailLesson';
import Typography from '@mobile/components/Typography';
import { HttpClient } from '@mobile/api/httpclient';
import { QueryKeys } from '@mobile/hooks/apis/queryKeys';
import { QueryClient } from '@tanstack/react-query';
import { FONT, SIZES, SHADOWS } from '@mobile/constants';
import MainSection from '@mobile/components/dictation/lesson/MainSection';
import Actions from '@mobile/components/dictation/lesson/Actions';
import TopSection from '@mobile/components/dictation/lesson/TopSection';

const { width } = Dimensions.get('window');
const queryCLient = new QueryClient();
const MIN_COUNT = 1;
const DetailLesson = () => {
  const lessonQuery: any = useDetailLesson();
  const lesson = lessonQuery?.data?.data;
  const lessonId = lesson?.id;
  const sentenceLength = lesson?.sentences?.length;
  const [sentenceCount, setSentenceCount] = useState(MIN_COUNT);
  const sentenceCorrect = lesson?.texts?.[sentenceCount]?.text;

  const { playerReady } = useSetupPlayer();
  const track = useActiveTrack(playerReady);
  const playbackState = usePlaybackState();

  const [newTrack, setNewTrack] = useState<Track | undefined>();
  console.log({ lesson });

  const getAudioKey = (count: number) => {
    if (!lesson) return;
    return (
      lesson?.sentences.find((sentence) => {
        return Number(sentence.audio.name) === count;
      })?.audio?.key || ''
    );
  };

  console.log({ lesson });

  useEffect(() => {
    const audioKey = getAudioKey(sentenceCount);
    if (!audioKey || !lessonId || !playerReady) return;
    (async () => {
      console.log('add first time');
      await TrackPlayer.reset();
      const queryKey = `${QueryKeys.sentenceNumber}${sentenceCount}`;
      const queryFn = () =>
        HttpClient.get('dictation/sentence', {
          params: {
            lessonId,
            audioKey,
          },
        });
      try {
        const response: any = await queryCLient.fetchQuery({
          queryKey: [queryKey],
          queryFn,
          staleTime: 1000 * 60 * 5,
        });
        const url = response.data?.audio?.path;
        if (!url) throw new Error("doesn't exist url track");
        const track = {
          url,
          title: response.data?.audio?.key,
          artist: 'Lee Nguyen',
        };

        const queue = await TrackPlayer.getQueue();
        if (playerReady && queue.length <= 0) {
          await TrackPlayer.add(track);
          await TrackPlayer.pause();
          await TrackPlayer.setRepeatMode(RepeatMode.Off);
        }
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, [lessonId, playerReady]);

  useEffect(() => {
    (async () => {
      if (playbackState.state === State.Ended && playerReady) {
        // await TrackPlayer.pause();
        const newAudioKey = getAudioKey(sentenceCount + 1);
        if (!newAudioKey) return;
        const response: any = await HttpClient.get('dictation/sentence', {
          params: {
            lessonId: lesson?.id,
            audioKey: newAudioKey,
          },
        });
        const url = response.data?.audio?.path;
        if (!url) return;
        const track = {
          url: response.data?.audio?.path,
          title: response.data?.audio?.key,
          artist: 'Lee Nguyen',
        };
        console.log('fetch new track', track);
        setNewTrack(track);
      }
    })();
  }, [playbackState.state]);

  const nextSentence = async () => {
    if (sentenceCount >= sentenceLength) return;
    try {
      let nextTrack;
      if (newTrack) {
        // console.log({ newTrack });
        nextTrack = newTrack;
      } else {
        const newAudioKey = getAudioKey(sentenceCount + 1);
        if (!newAudioKey) return;
        const response: any = await HttpClient.get('dictation/sentence', {
          params: {
            lessonId: lessonId,
            audioKey: newAudioKey,
          },
        });
        const url = response.data?.audio?.path;
        if (!url) return;
        nextTrack = {
          url: response.data?.audio?.path,
          title: response.data?.audio?.key,
          artist: 'Lee Nguyen',
        };
      }

      console.log({ nextTrack });
      const currentIndex = await TrackPlayer.getActiveTrackIndex();
      await TrackPlayer.add(nextTrack, currentIndex + 1);
      await TrackPlayer.skipToNext();
      setSentenceCount((prev) => prev + 1);
      // log
      const list = await TrackPlayer.getQueue();
      console.log(list, list.length);
      // console.log({ currentIndex, track: newTrack });
    } catch (error) {
      console.log(error);
    }
  };
  const previousSentence = async () => {
    if (sentenceCount <= MIN_COUNT) return;
    const currentIndex = await TrackPlayer.getActiveTrackIndex();
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.remove(currentIndex);
    setSentenceCount((prev) => prev - 1);
  };

  if (!playerReady)
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  return (
    <View style={styles.container}>
      <Typography style={styles.title}>
        {`${lesson?.name} (Listen and Type)`}
      </Typography>
      <MainSection sentenceCorrect={sentenceCorrect} />
      <Actions />
    </View>
  );
};

export default DetailLesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});
