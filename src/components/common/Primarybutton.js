import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';

const Primarybutton = props => {
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
    backgroundColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.x9,
  },
  title: {
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
  },
});

export default Primarybutton;
