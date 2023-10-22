import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Routes, Sizes} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const SearchCard = props => {
  const {name, price, imageUrl} = props.item;
  const navigation = useNavigation();

  const onCardClick = () => {
    navigation.navigate(Routes.PRODUCT_DETAILS, props.item);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onCardClick}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.img} />
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Sizes.x3,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  imageContainer: {
    width: Sizes.x12,
    height: Sizes.x12,
    marginRight: Sizes.x1,
    marginLeft: Sizes.x1,
    marginVertical: Sizes.x1,
  },
  img: {
    width: Sizes.x12,
    height: Sizes.x12,
    objectFit: 'contain',
    borderRadius: Sizes.x3,
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  name: {
    fontFamily: FontFamily.regular,
    color: Colors.black,
    fontSize: FontSize.xmedium,
  },
  price: {
    fontFamily: FontFamily.regular,
    color: Colors.orange,
    textAlign: 'left',
    marginTop: Sizes.x1 / 2,
    fontSize: FontSize.medium,
  },
});
