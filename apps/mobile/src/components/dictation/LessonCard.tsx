import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Typography from '../Typography';
import { FONT, SIZES, SHADOWS, COLORS } from '@mobile/constants';

const LessonCard = () => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <Typography>⭐</Typography>
      <View style={styles.rightContainer}>
        <Typography style={styles.title}>1. First snowball</Typography>
        <TouchableOpacity onPress={handlePress}>
          <Typography>Listen & type</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LessonCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    padding: 10,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    borderRadius: SIZES.medium,
    backgroundColor: '#FFF',
  },
  rightContainer: {
    rowGap: 4,
  },
  title: { fontFamily: FONT.medium },
});
