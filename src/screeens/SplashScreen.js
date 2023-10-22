import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Sizes} from '../constants';
import {useDispatch} from 'react-redux';
import {updateSplashLoadingState, updateUser} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          dispatch(updateUser(JSON.parse(user)));
        }
      } catch (e) {
        console.log('Error in async storage splash screen::', e);
      } finally {
        dispatch(updateSplashLoadingState(false));
      }
    };
    setTimeout(() => {
      getToken();
    }, 1000);
  }, []);

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
