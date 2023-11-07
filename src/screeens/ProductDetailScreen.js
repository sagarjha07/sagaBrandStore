import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Colors,
  FontFamily,
  FontSize,
  Routes,
  Sizes,
  productSizeArr,
  showToast,
} from '../constants';
import Primarybutton from '../components/common/Primarybutton';
import NavigationBar from '../components/common/NavigationBar';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/slices/cartSlice';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(1);
  const route = useRoute();
  const {name, price, imageUrl, $id, description} = route.params;

  const isItemAlreadyInCart = () => {
    for (item of cartItems) {
      if (item.$id === $id) return true;
    }
    return false;
  };
  const [itemAdded, setIsItemAdded] = useState(isItemAlreadyInCart());

  const onSizeClick = index => {
    setCurrentSizeIndex(index);
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <NavigationBar title={name} />
        <Image source={{uri: imageUrl}} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.head}>Product Buy</Text>
            <Text style={styles.price}>₹{price}</Text>
          </View>
        </View>
        <Text style={styles.sizeTxt}>Size</Text>
        <View style={[styles.sizeContainer, {marginBottom: Sizes.x1}]}>
          {productSizeArr.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.singleSize,
                  {
                    backgroundColor:
                      currentSizeIndex === index ? Colors.black : null,
                  },
                ]}
                onPress={() => {
                  onSizeClick(index);
                }}>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        currentSizeIndex === index
                          ? Colors.white
                          : Colors.lightGrey,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.priceBtn}>₹{price}</Text>
          <Primarybutton
            title={itemAdded ? 'Remove From Cart' : 'Add To Cart'}
            width={'60%'}
            height={Sizes.x6}
            onPress={() => {
              if (itemAdded) {
                dispatch(removeFromCart($id));
                setIsItemAdded(false);
                showToast(
                  'error',
                  'Item removed from cart',
                  'Oh Oh! This is a great product, Please continue shopping',
                );
              } else {
                dispatch(addToCart(route.params));
                setIsItemAdded(true);
                showToast(
                  'success',
                  'Item added in cart',
                  'Go to cart and place your order',
                );
              }
            }}
          />
        </View>
        {description && (
          <>
            <Text style={styles.sizeTxt}>Description</Text>
            <View style={styles.sizeContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
          </>
        )}
      </ScrollView>
      {itemAdded ? (
        <TouchableOpacity
          style={styles.cartFloating}
          onPress={() => {
            navigation.navigate(Routes.CART);
          }}>
          <View>
            <Text style={styles.cartFloatingtxt}>GO TO CART</Text>
            <Text style={styles.cartFloatingtxtSub}>
              Item already present in cart
            </Text>
          </View>
          <Image
            source={require('../../assets/icons/cart.png')}
            style={styles.cartImg}
          />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.x3,
    backgroundColor: Colors.white,
    paddingBottom: Sizes.x9,
  },
  img: {
    height: Sizes.x20 * 2,
    width: '100%',
    objectFit: 'contain',
    borderRadius: Sizes.x4,
    marginTop: Sizes.x3,
    borderWidth: 2,
    borderColor: Colors.orange,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: Sizes.x1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 0.8,
    fontSize: Sizes.x3,
    color: Colors.black,
    fontFamily: FontFamily.regular,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Sizes.x1,
    paddingHorizontal: Sizes.x1 / 2,
    borderRadius: Sizes.x3 / 2,
    elevation: 10,
  },
  price: {
    color: Colors.lightGrey,
    fontSize: FontSize.xmedium,
    fontFamily: FontFamily.regular,
  },
  head: {
    color: Colors.orange,
    fontSize: FontSize.medium,
    fontFamily: FontFamily.regular,
    fontWeight: 'bold',
  },
  sizeTxt: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.large,
    color: Colors.black,
    marginTop: Sizes.x1,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Sizes.x1,
    backgroundColor: Colors.white,
    paddingBottom: Sizes.x1,
    elevation: 5,
    borderRadius: Sizes.x1,
    paddingHorizontal: Sizes.x2,
    marginBottom: Sizes.x1,
  },
  description: {
    color: Colors.lightGrey,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.medium,
  },

  priceBtn: {
    color: Colors.black,
    fontSize: FontSize.slarge,
    fontFamily: FontFamily.regular,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Sizes.x1,
  },
  singleSize: {
    backgroundColor: Colors.black,
    paddingHorizontal: Sizes.x3 / 2,
    paddingVertical: Sizes.x1 / 2,
    borderRadius: Sizes.x1,
  },
  text: {
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.large,
  },
  cartFloating: {
    position: 'absolute',
    bottom: Sizes.x2,
    left: Sizes.x2,
    right: Sizes.x2,
    backgroundColor: Colors.orange,
    padding: Sizes.x1,
    borderRadius: Sizes.x2,
    paddingHorizontal: Sizes.x3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartFloatingtxt: {
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.medium,
  },
  cartFloatingtxtSub: {
    color: Colors.black,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.small,
  },
  cartImg: {
    height: Sizes.x4,
    width: Sizes.x4,
    marginRight: Sizes.x1,
    tintColor: Colors.white,
    objectFit: 'contain',
  },
});
