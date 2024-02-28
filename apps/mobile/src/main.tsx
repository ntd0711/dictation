import { AppRegistry } from 'react-native';
import App from './app/App';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from '@mobile/services/PlaybackService';

AppRegistry.registerComponent('Mobile', () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);
