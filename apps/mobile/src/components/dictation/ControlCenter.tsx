import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Feather';

interface Props {
  onNext: () => void;
  onPrevious: () => void;
}

const ControlCenter: FC<Props> = ({ onNext, onPrevious }) => {
  const playbackState = usePlaybackState();
  // const next = async () => {
  //   await TrackPlayer.skipToNext();
  // };
  const previous = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const toggle = async (playback: any) => {
    try {
      const currentTrack = await TrackPlayer.getActiveTrackIndex();
      console.log({ playback });
      if (currentTrack !== null) {
        if (
          playback === State.Ended ||
          playback === State.Paused ||
          playback === State.Ready
        ) {
          await TrackPlayer.seekTo(0);
          await TrackPlayer.play();
          console.log('play');
        } else {
          console.log('pause');
          await TrackPlayer.pause();
        }
      }
    } catch (error) {
      console.log('error toggle', error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => toggle(playbackState.state)}>
        <Icon
          style={styles.icon}
          name={playbackState.state === State.Playing ? 'pause' : 'play'}
          size={40}
        />
      </Pressable>
      <Pressable onPress={onNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    columnGap: 10,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#ccc',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
