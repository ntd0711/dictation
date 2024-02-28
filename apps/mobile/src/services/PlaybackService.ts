import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  Track,
} from 'react-native-track-player';

const tracks1: Track[] = [
  {
    // url: require('../assets/audio/one.mp3'), // Load media from the network
    url: 'https://actions.google.com/sounds/v1/sports/baseball_glove_tag_out.ogg', // Load media from the network
    title: '1',
    artist: 'Lee Nguyen',
  },
];

const data: Track[] = [
  {
    url: 'http://10.0.2.2:9006/fluentpal/audio_file/BI7l_eY3cesTzy-Y5z9nIQ.mp3',
    title: '1',
    artist: 'Lee Nguyen',
  },
  // {
  //   url: 'http://10.0.2.2:9006/fluentpal/audio_file/3NqCfnchxT6reUyBvnrB1A.mp3',
  //   title: '2',
  //   artist: 'Lee Nguyen2',
  // },
  // {
  //   url: 'http://10.0.2.2:9006/fluentpal/audio_file/oSY-INHhqVdm7_V_0NfqAA.mp3',
  //   title: '3',
  //   artist: 'Lee Nguyen32',
  // },
];

export const setupPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
};

// export const addTrack = async (track?: Track | Track[]) => {
//   await TrackPlayer.add(track);
//   await TrackPlayer.setRepeatMode(RepeatMode.Off);
// };

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext()
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious()
  );
  // TrackPlayer.addEventListener(
  //   Event.PlaybackActiveTrackChanged,
  //   async (data) => {
  //     if (data.track === null) {
  //       TrackPlayer.pause();
  //     }
  //     console.log('register track change');
  //   }
  //   // TrackPlayer.skipToPrevious()
  // );
};
