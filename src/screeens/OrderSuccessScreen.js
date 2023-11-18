import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Sizes} from '../constants';
import {useDispatch} from 'react-redux';
import {emptyCart} from '../redux/slices/cartSlice';
import LottieView from 'lottie-react-native';
import NavigationBar from '../components/common/NavigationBar';

const OrderSuccessScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(emptyCart());
    }, 500);
  }, []);
  return (
    <View style={styles.container}>
      <NavigationBar title={''} />
      <LottieView
        style={{flex: 1, height: '90%', width: '100%'}}
        source={require('../../assets/lottie/order_placed.json')}
        autoPlay
        loop={false}
        resizeMode="contain"
      />
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.x2,
    paddingTop: Sizes.x1,
    backgroundColor: Colors.white,
  },
});
