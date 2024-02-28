import Typography from '@mobile/components/Typography';
import IntroductionMain from '@mobile/components/home/IntroductionMain';
import IntroductionTop from '@mobile/components/home/IntroductionTop';
import { useUserStore } from '@mobile/stores';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const Home = () => {
  const { user } = useUserStore((state) => state);
  console.log('user>>>', user);
  return (
    <SafeAreaView style={styles.homeContainer}>
      <IntroductionTop />
      {/* <Divider width={1} orientation="vertical" /> */}
      <IntroductionMain />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
    paddingBottom: 70,
  },
});
