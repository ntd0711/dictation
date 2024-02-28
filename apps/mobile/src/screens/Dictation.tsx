import Typography from '@mobile/components/Typography';
import ConversationCard from '@mobile/components/dictation/ConversationCard';
import LessonCard from '@mobile/components/dictation/LessonCard';
import ShortStoryCard from '@mobile/components/dictation/ShortStoryCard';
import ToeicCard from '@mobile/components/dictation/ToeicCard';
import YoutubeCard from '@mobile/components/dictation/YoutubeCard';
import { FONT, SIZES } from '@mobile/constants';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Dictation = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Typography style={styles.title}>All Topic</Typography>
        <ShortStoryCard navigation={navigation} />
        <ConversationCard />
        <YoutubeCard />
        <ToeicCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dictation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    paddingBottom: 70,
    rowGap: 20,
    flexDirection: 'column',
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.medium,
    marginBottom: 20,
  },
});
