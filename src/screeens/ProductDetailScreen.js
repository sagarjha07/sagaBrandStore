import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Colors,
  FontFamily,
  FontSize,
  Sizes,
  productSizeArr,
} from '../constants';
import Primarybutton from '../components/common/Primarybutton';
import NavigationBar from '../components/common/NavigationBar';

const ProductDetailScreen = () => {
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const route = useRoute();
  const {name, price, imageUrl} = route.params;
  const onSizeClick = index => {
    setCurrentSizeIndex(index);
  };
  return (
    <>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        <NavigationBar title={'Product Details'} />
        <Image source={{uri: imageUrl}} style={styles.img} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.head}>Product Buy</Text>
            <Text style={styles.price}>₹{price}</Text>
          </View>
        </View>
        <Text style={styles.sizeTxt}>Size</Text>
        <View style={styles.sizeContainer}>
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text style={styles.priceBtn}>₹{price}</Text>
        <Primarybutton
          title="Add To Cart"
          width={'60%'}
          height={Sizes.x6}
          onPress={() => {
            //TODO: implement onPress
          }}
        />
      </View>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.x3,
    backgroundColor: Colors.white,
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
    marginTop: Sizes.x2,
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
    backgroundColor: Colors.black,
    paddingVertical: Sizes.x1,
    paddingHorizontal: Sizes.x1 / 2,
    borderRadius: Sizes.x3 / 2,
  },
  price: {
    color: Colors.orange,
    fontSize: FontSize.xmedium,
    fontFamily: FontFamily.regular,
  },
  head: {
    color: Colors.white,
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
    position: 'absolute',
    bottom: Sizes.x2,
    right: Sizes.x3,
    left: Sizes.x3,
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
});
