import { FONT } from '@mobile/constants';
import React, { FC, PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type TextProps = Text['props'];
interface Props extends TextProps {}
const Typography: FC<Props> = (props) => {
  const { children, style } = props;
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default Typography;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONT.regular,
    // color: black
  },
});
