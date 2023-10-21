import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Sizes} from '../constants';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/logo.png')}
        style={styles.img}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  img: {
    objectFit: 'contain',
    width: Sizes.x15 * 2,
    height: Sizes.x15 * 2,
    borderRadius: Sizes.x15,
  },
});
