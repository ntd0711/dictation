import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SIZES } from '@mobile/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-elements';

const actions = [
  {
    id: 1,
    name: 'skip-previous',
    icon: <Icon name="skip-previous" size={26} />,
  },
  {
    id: 2,
    name: 'replay',
    icon: <Icon name="replay" size={26} />,
  },
  {
    id: 3,
    name: 'skip-next',
    icon: <Icon name="skip-next" size={26} />,
  },
];

const Actions = () => {
  const onPress = () => {};
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {actions.map((action) => {
          return (
            <TouchableOpacity key={action.name} onPress={onPress}>
              <Icon name={action.name} size={30} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Actions;

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
