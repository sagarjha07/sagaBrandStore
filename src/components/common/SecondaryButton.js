import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';

const SecondaryButton = props => {
  const {width, height, onPress, title} = props;
  return (
    <TouchableOpacity
      style={[styles.container, {width: width, height: height}]}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: Sizes.x9,
  },
  title: {
    color: Colors.black,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
  },
});

export default SecondaryButton;
