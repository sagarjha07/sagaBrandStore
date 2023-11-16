import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';
import {useSelector} from 'react-redux';
import Primarybutton from '../common/Primarybutton';

const CartTotalComponent = () => {
  const cartItems = useSelector(state => state.cart.items);

  const totalItemsPrice = () => {
    let totalPriceOfItems = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPriceOfItems += cartItems[i].price * cartItems[i].qty;
    }
    return totalPriceOfItems;
  };
  const delivery = 100;

  return (
    <View style={styles.container}>
      <View style={styles.border} />
      <View style={styles.row}>
        <Text style={styles.totalText}>Total Items ({cartItems.length})</Text>
        <Text style={styles.totalPrice}>₹{totalItemsPrice()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalText}>Standard Delievery</Text>
        <Text style={styles.totalPrice}>₹{delivery}</Text>
      </View>
      <View
        style={{
          ...styles.border,
          marginBottom: Sizes.x1,
          marginTop: Sizes.x1,
        }}
      />
      <View style={styles.row}>
        <Text style={{...styles.totalText, color: Colors.orange}}>
          Total Payment
        </Text>
        <Text style={{...styles.totalPrice, color: Colors.orange}}>
          ₹{totalItemsPrice() + delivery}
        </Text>
      </View>
      <View
        style={{
          ...styles.border,
          marginBottom: Sizes.x1,
          marginTop: Sizes.x1,
        }}
      />
      <View style={styles.btnContainer}>
        <Primarybutton
          title="Checkout Now"
          width={Sizes.x16}
          height={Sizes.x6}
        />
      </View>
    </View>
  );
};

export default CartTotalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    opacity: 0.4,
    marginTop: Sizes.x2,
    marginBottom: Sizes.x3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Sizes.x1 / 2,
    marginBottom: Sizes.x1,
  },
  totalText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
  },
  totalPrice: {
    color: Colors.black,
    fontSize: FontSize.xmedium,
    fontFamily: FontFamily.regular,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.x1,
  },
});
