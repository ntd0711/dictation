import Slider from '@react-native-community/slider';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useProgress } from 'react-native-track-player';

const AudioSlider = () => {
  const { position, duration, buffered } = useProgress();

  const formatSeconds = (time: number) =>
    new Date(time * 1000).toISOString().slice(14, 19);

  return (
    <View style={styles.container}>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#000"
        maximumTrackTintColor="#000"
        style={styles.sliderContainer}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatSeconds(position)}</Text>
        <Text style={styles.time}>
          {formatSeconds(Math.max(0, duration - position))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#000',
  },
});

export default AudioSlider;
