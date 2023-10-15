import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';

const ProductCard = props => {
  const {data} = props;
  const {name, price, imageUrl} = data;
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.img} />
      <Text style={styles.price}>₹{price}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: Sizes.x15,
    flex: 1,
    marginBottom: Sizes.x2,
  },
  img: {
    height: Sizes.x20,
    objectFit: 'contain',
    borderRadius: Sizes.x3 / 2,
  },
  price: {
    fontFamily: FontFamily.regular,
    color: Colors.black,
    fontSize: FontSize.xmedium,
    marginTop: Sizes.x1 / 2,
  },
  name: {
    fontFamily: FontFamily.regular,
    color: Colors.lightGrey,
    fontSize: FontSize.medium,
  },
});
