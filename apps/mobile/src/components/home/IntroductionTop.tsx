import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '@mobile/constants';
import { Button } from 'react-native-elements';

const IntroductionTop = () => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>👋 Howdy, Diego11</Text>
      <View style={styles.childContainer}>
        <Text style={styles.introduction}>
          Dictation is a method to learn languages by listening and writing down
          what you hear. It is a highly effective method!
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.button}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroductionTop;

const styles = StyleSheet.create({
  container: {
    // padding: 8,
    marginBottom: 20,
  },
  hello: {
    fontFamily: 'DMSans-Bold',
    fontSize: SIZES.medium,
    marginBottom: 8,
    color: COLORS.blue,
  },
  childContainer: {
    borderRadius: 16,
    backgroundColor: '#f1c40f',
    padding: 10,
  },
  introduction: {
    fontFamily: 'DMSans-Regular',
    color: COLORS.blue,
    fontSize: SIZES.medium,
    marginBottom: 10,
  },
  button: {
    color: COLORS.white,
    backgroundColor: COLORS.lightBlue,
    padding: 6,
    borderRadius: 14,
    alignItems: 'center',
    width: 90,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: SIZES.small,
  },
});
