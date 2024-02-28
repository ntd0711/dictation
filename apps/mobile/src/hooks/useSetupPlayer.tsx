import { HttpClient } from '@mobile/api/httpclient';
import { setupPlayer } from '@mobile/services/PlaybackService';
import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';

export const useSetupPlayer = () => {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  const handleSetPlayerReady = (isPlayerReady: boolean) => {
    setPlayerReady(isPlayerReady);
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const isSetup = await setupPlayer();
      setPlayerReady(isSetup);
    })();
    return () => {
      console.log('unmount');
      unmounted = true;
    };
  }, []);

  return { playerReady, onSetPlayerReady: handleSetPlayerReady };
};
