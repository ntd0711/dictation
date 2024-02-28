import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { getActiveTrack } from 'react-native-track-player/lib/trackPlayer';

export const useActiveTrack = (playerReady: boolean) => {
  const [track, setTrack] = useState<Track | undefined>(undefined);

  useEffect(() => {
    if (!playerReady) return;
    let unmounted = false;
    (async () => {
      // console.log(track)
      try {
        const initialTrack = await TrackPlayer.getActiveTrack();
        console.log({ initialTrack });
        if (unmounted) return;
        setTrack((track) => track ?? initialTrack ?? undefined);
      } catch (error) {
        console.log('error', error);
      }
    })();
    return () => {
      console.log('component unmount');
      unmounted = true;
    };
  }, [playerReady]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (data) => {
    console.log('change track');
    setTrack(data.track ?? undefined);
  });

  return track;
};
