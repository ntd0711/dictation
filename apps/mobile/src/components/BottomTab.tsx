import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Divider } from 'react-native-elements';

import homeIconActive from '../assets/bottomTab/home_icon_active.png';
import homeIconInactive from '../assets/bottomTab/home_icon_inactive.png';
import { SIZES } from '@mobile/constants';
const icons = [
  {
    id: 1,
    name: 'home',
    title: 'Dictation',
    active: homeIconActive,
    inactive: homeIconInactive,
  },
  {
    id: 2,
    name: 'profile',
    title: 'Profile',
    active: homeIconActive,
    inactive: homeIconInactive,
  },
  {
    id: 3,
    name: 'setting',
    title: 'Setting',
    active: homeIconActive,
    inactive: homeIconInactive,
  },
];

const BottomTab = () => {
  const [active, setActive] = useState<string>('home');
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon) => {
          return (
            <Icon
              key={icon.name}
              onPress={() => setActive(icon.name)}
              source={icon.name === active ? icon.active : icon.inactive}
              title={icon.title}
            />
          );
        })}
      </View>
    </View>
  );
};

const Icon = ({ source, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapperIcon}>
        <Image source={source} style={styles.icon} />
        <Text style={styles.iconText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', width: '100%', bottom: 0 },
  container: {
    flexDirection: 'row',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  wrapperIcon: {
    // flexDirection: ''
    alignItems: 'center',
    // fontSize: 20,
  },
  iconText: {
    fontSize: SIZES.small,
    // color: 'red',
    // fontSize: 20,
    fontFamily: 'DMSans-Medium',
  },
  icon: { width: 30, height: 30 },
});
