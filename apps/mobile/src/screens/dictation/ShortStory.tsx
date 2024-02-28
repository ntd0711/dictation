import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LessonCard from '@mobile/components/dictation/LessonCard';

const ShortStory = () => {
  //call api
  return (
    <SafeAreaView style={styles.container}>
      <LessonCard />
    </SafeAreaView>
  );
};

export default ShortStory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
    paddingBottom: 70,
  },
});
