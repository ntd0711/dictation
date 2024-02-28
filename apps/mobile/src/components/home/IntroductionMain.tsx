import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Typography from '@mobile/components/Typography';
import correctIcon from '@mobile/assets/home/correct_icon.svg';
import { FONT, SIZES } from '@mobile/constants';
const IntroductionMain = () => {
  return (
    <ScrollView>
      <Typography style={styles.title}>
        How practicing dictation will improve your English skills?
      </Typography>
      <Typography style={styles.description}>
        When practicing exercises at dailydictation.com, you will go through 4
        main steps, all of them are equally important!
      </Typography>
      <View style={styles.stepsContainer}>
        <View style={styles.stepBlock}>
          {/* <Image
            source={{
              uri: 'https://res.cloudinary.com/dr22k5qml/image/upload/v1651286044/dailydictation/tl9vx19jevxg7lv5fi1n.png',
            }}
            style={styles.stepImage}
          /> */}
          <Typography style={styles.stepTitle}>
            1. Listen to the audio
          </Typography>
          <Typography style={styles.stepDescription}>
            Through the exercises, you will have to listen a lot; that's the key
            to improving your listening skills in any learning method.
          </Typography>
        </View>
        <View style={styles.stepBlock}>
          {/* <Image
            source={{
              uri: 'https://res.cloudinary.com/dr22k5qml/image/upload/v1651286044/dailydictation/a446xbtpfmvkmrgqkfzt.png',
            }}
            style={styles.stepImage}
          /> */}
          <Typography style={styles.stepTitle}>
            2. Type what you hear
          </Typography>
          <Typography style={styles.stepDescription}>
            Typing what you hear forces you to focus on every detail which helps
            you become better at pronunciation, spelling and writing.
          </Typography>
        </View>
        <View style={styles.stepBlock}>
          {/* <Image
            source={{
              uri: 'https://res.cloudinary.com/dr22k5qml/image/upload/v1651286044/dailydictation/a446xbtpfmvkmrgqkfzt.png',
            }}
            style={styles.stepImage}
          /> */}
          <Typography style={styles.stepTitle}>3. Check & correct</Typography>
          <Typography style={styles.stepDescription}>
            Error correction is important for your listening accuracy and
            reading comprehension, it's best to learn from mistakes.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroductionMain;

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xLarge,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: FONT.medium,
    marginBottom: 10,
  },
  description: {
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  stepsContainer: {
    rowGap: 30,
    marginTop: 30,
  },
  stepBlock: {
    alignItems: 'center',
    gap: 8,

    marginHorizontal: 'auto',
  },
  stepImage: { height: 50, width: 50 },
  stepTitle: { fontSize: SIZES.large, fontFamily: FONT.medium },
  stepDescription: {
    fontSize: SIZES.medium,
    // width: '80%',
    textAlign: 'center',
  },
});
