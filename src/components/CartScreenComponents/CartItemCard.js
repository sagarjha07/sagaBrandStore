import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';
import {useDispatch} from 'react-redux';
import {
  decreaseQtyOfItem,
  increaseQtyofItem,
  removeFromCart,
} from '../../redux/slices/cartSlice';

const CartItemCard = props => {
  const {name, price, imageUrl, $id, qty} = props.item;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.img} />
      <View style={styles.details}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{price}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={{...styles.decContainer}}
              onPress={() => {
                if (qty === 1) dispatch(removeFromCart($id));
                else dispatch(decreaseQtyOfItem($id));
              }}>
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <View style={styles.qtyCon}>
              <Text style={styles.qty}>{qty}</Text>
            </View>
            <TouchableOpacity
              style={{...styles.decContainer}}
              onPress={() => {
                dispatch(increaseQtyofItem($id));
              }}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(removeFromCart($id));
            }}>
            <Image
              source={require('../../../assets/icons/trash.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: Sizes.x2,
  },
  img: {
    width: Sizes.x11,
    height: Sizes.x15,
    objectFit: 'contain',
    marginRight: Sizes.x2,
    borderRadius: Sizes.x2,
  },
  details: {
    flexDirection: 'column',
    paddingVertical: Sizes.x1,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FontFamily.regular,
    color: Colors.black,
    fontSize: FontSize.xmedium,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: FontFamily.regular,
    color: Colors.black,
    fontSize: FontSize.large,
  },
  icon: {
    width: Sizes.x4,
    height: Sizes.x4,
    objectFit: 'contain',
  },
  qtyContainer: {
    width: Sizes.x10,
    height: Sizes.x4,
    borderWidth: 1,
    borderRadius: Sizes.x1,
    borderColor: Colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  decContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Sizes.x3,
    fontFamily: Colors.regular,
    color: Colors.lightGrey,
  },
  qtyCon: {
    backgroundColor: Colors.orange,
    paddingHorizontal: Sizes.x3 / 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    fontFamily: FontFamily.regular,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSize.xmedium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
