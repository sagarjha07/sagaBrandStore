import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, showToast, Sizes} from '../../constants';
import FilterList from './FilterList';
import authService from '../../appwrite/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      console.log('error in logout function headerComponent::', error);
    }
  };

  const showAlert = (title, message, okPress) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        okPress && {text: 'OK', onPress: okPress},
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../assets/icons/tab.png')}
          style={styles.img}
        />
        <TouchableOpacity
          onPress={() => {
            showAlert(
              'Are you sure, you wanna logout?',
              "Try to explore more, Don't leave....",
              logout,
            );
          }}>
          <Image
            source={require('../../../assets/icons/logout.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subTitle}>Best trendy collection!</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Sizes.x3,
    paddingHorizontal: Sizes.x3,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    height: Sizes.x5 / 2,
    width: Sizes.x5 / 2,
  },
  textContainer: {
    paddingTop: Sizes.x2,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.slarge,
    color: Colors.black,
  },
  subTitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
    color: Colors.lightGrey,
  },
});
