import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {Colors, FontFamily, Sizes} from '../constants';
import {useSelector} from 'react-redux';
import CartItemCard from '../components/CartScreenComponents/CartItemCard';
import CartTotalComponent from '../components/CartScreenComponents/CartTotalComponent';
import LottieView from 'lottie-react-native';

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.items);
  if (cartItems.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          style={{flex: 1, height: 400, width: '90%'}}
          source={require('../../assets/lottie/empty_cart.json')}
          autoPlay
          loop
          resizeMode="conatain"
        />
      </View>
    );
  }
  return (
    <FlatList
      data={cartItems}
      style={styles.container}
      contentContainerStyle={styles.content}
      bounces={false}
      ListHeaderComponent={<Text style={styles.title}>My Cart</Text>}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <CartItemCard item={item} />}
      ListFooterComponent={cartItems.length > 0 ? <CartTotalComponent /> : null}
      keyExtractor={item => item.$id}
    />
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x2,
  },
  content: {
    paddingBottom: Sizes.x10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.black,
    fontFamily: FontFamily.regular,
    fontSize: Sizes.x4,
    marginBottom: Sizes.x2,
  },
});
