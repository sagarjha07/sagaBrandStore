import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../constants';
import HomeScreen from './HomeScreen';
import NavigationBar from '../components/common/NavigationBar';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x2,
  },
  title: {
    color: Colors.black,
    fontFamily: FontFamily.regular,
    fontSize: Sizes.x4,
  },
});
