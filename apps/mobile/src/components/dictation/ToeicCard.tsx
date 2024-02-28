import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Typography from '../Typography';
import { COLORS, FONT, SIZES } from '@mobile/constants';

const ToeicCard = () => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <Typography style={styles.title}>Toeic Listening</Typography>
      <Typography style={styles.chip}>Level: Medium</Typography>
      <Typography style={styles.description}>
        A collection of audio articles introducing culture, people, places,
        historical events and daily life in English-speaking countries,
        especially Canada and America.
      </Typography>
      <TouchableOpacity onPress={handlePress}>
        <Typography style={styles.button}>View exercises</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default ToeicCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.blue,
    marginBottom: 8,
  },
  chip: {
    marginBottom: 10,
    fontFamily: FONT.bold,
    // backgroundColor: COLORS.lightBlue,
    // width: '',
  },
  description: {
    fontSize: SIZES.medium,
    marginBottom: 12,
  },
  button: {
    fontSize: SIZES.medium,
  },
});
