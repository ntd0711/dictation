import { COLORS, FONT, SHADOWS, SIZES } from '@mobile/constants';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../Typography';
import { HttpClient } from '@mobile/api/httpclient';

type Props = {
  name: string;
  type: number;
  onPress: () => void;
};

const LessonCard: FC<Props> = (props) => {
  const handlePress = async () => {};
  return (
    <View style={styles.container}>
      <Typography>⭐</Typography>
      <View style={styles.rightContainer}>
        <Typography style={styles.title}>{props.name}</Typography>
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
