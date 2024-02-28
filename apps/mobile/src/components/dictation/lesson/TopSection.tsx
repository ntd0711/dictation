import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SIZES } from '@mobile/constants';
import Typography from '@mobile/components/Typography';

const TopSection = () => {
  return (
    <View style={styles.container}>
      <Icon name="arrow-left" style={styles.icon} size={26} />
      <Typography style={styles.title}>1 / 21</Typography>
      <Icon name="arrow-right" style={styles.icon} size={26} />
    </View>
  );
};

export default TopSection;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.large,
  },
  container: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
});
