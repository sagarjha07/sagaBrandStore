import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Colors,
  FontFamily,
  FontSize,
  Routes,
  Sizes,
  showAlert,
  showToast,
} from '../constants';
import authService from '../appwrite/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUser} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const res = await authService.getCurrentUser();
      setUser(res);
    })();
  }, []);

  const logout = async () => {
    try {
      await authService.logOut();
      await AsyncStorage.removeItem('user', () => {
        dispatch(updateUser(null));
        showToast(
          'success',
          'Logged out successfully',
          'Login again if you want to explore more 👋',
        );
      });
    } catch (error) {
      showToast(
        'error',
        'Something went wrong',
        'Unable to Logout, Please try again later',
      );
      console.log('error in logout function SetingsScreen::', error);
    }
  };

  if (!user) {
    return (
      <LottieView
        style={styles.lottie}
        source={require('../../assets/lottie/loading.json')}
        autoPlay
        loop
        resizeMode="contain"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../assets/icons/profile.png')}
          style={styles.img}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate(Routes.ORDERS);
        }}>
        <Text style={styles.txt}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          showAlert(
            'Are you sure, you wanna logout?',
            "Try to explore more, Don't leave....",
            logout,
          );
        }}>
        <Text style={styles.txt}>Logout</Text>
        <Image
          source={require('../../assets/icons/logout.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x5,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  lottie: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  img: {
    width: Sizes.x6,
    height: Sizes.x6,
    marginBottom: Sizes.x1,
    tintColor: Colors.orange,
  },
  row: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: '100%',
    height: Sizes.x6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.x2,
    borderRadius: Sizes.x2,
    elevation: 10,
    marginBottom: Sizes.x3,
  },
  txt: {
    color: Colors.orange,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
  },
  icon: {
    width: Sizes.x5 / 2,
    height: Sizes.x5 / 2,
    tintColor: Colors.black,
    opacity: 0.8,
  },
  name: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.large,
    color: Colors.black,
    marginBottom: Sizes.x1 / 2,
  },
  email: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
    color: Colors.lightGrey,
  },
});
