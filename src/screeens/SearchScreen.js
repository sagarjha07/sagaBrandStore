import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../constants';
import databaseService from '../appwrite/DatabaseService';
import SearchCard from '../components/SearchScreenComponents/SearchCard';
import LottieView from 'lottie-react-native';

const SearchScreen = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState(null);

  const getProducts = async searchStr => {
    const res = await databaseService.getAllProductsWithSearchStr(searchStr);
    setProductsList(res);
    setLoading(false);
  };

  useEffect(() => {
    //DEBOUNCING LOGIC
    if (searchStr !== null) {
      setLoading(true);
      if (searchStr.length === 0) {
        setProductsList([]);
        setLoading(false);
      }
      const getData = setTimeout(() => {
        getProducts(searchStr);
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchStr]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Search here"
          style={styles.textInput}
          placeholderTextColor={Colors.lightGrey}
          onChangeText={val => {
            setSearchStr(val);
          }}
        />
      </View>
      <View style={styles.flatListContainer}>
        {productsList.length > 0 && (
          <Text style={styles.heading}>
            {productsList.length} results found
          </Text>
        )}
        {loading ? (
          <View style={styles.loader}>
            <LottieView
              style={{flex: 1, height: 400, width: '100%'}}
              source={require('../../assets/lottie/loading.json')}
              autoPlay
              loop
              resizeMode="conatain"
            />
          </View>
        ) : searchStr !== null &&
          searchStr.length > 0 &&
          productsList.length > 0 ? (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={productsList}
            renderItem={({item, index}) => (
              <View
                style={{
                  marginBottom:
                    index === productsList.length - 1 ? Sizes.x9 : Sizes.x3,
                }}>
                <SearchCard item={item} />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/icons/cart.png')}
              style={styles.img}
            />
            <Text style={styles.emptyText}>
              {searchStr === null || searchStr.length === 0
                ? 'Explore branded products here...'
                : productsList.length === 0
                ? 'No product found'
                : ''}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    paddingHorizontal: Sizes.x2,
    paddingTop: Sizes.x4,
    paddingBottom: Sizes.x7,
  },
  textInput: {
    width: '100%',
    borderRadius: Sizes.x2,
    paddingHorizontal: Sizes.x2,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    color: Colors.orange,
  },
  flatListContainer: {
    backgroundColor: Colors.white,
    borderTopRightRadius: Sizes.x4,
    borderTopLeftRadius: Sizes.x4,
    marginTop: -Sizes.x4,
    flex: 1,
    paddingHorizontal: Sizes.x3,
  },
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flatList: {
    marginTop: Sizes.x2,
  },
  heading: {
    fontFamily: FontFamily.regular,
    color: Colors.lightGrey,
    marginTop: Sizes.x1,
    fontSize: FontSize.medium,
  },
  emptyText: {opacity: 0.8, marginTop: Sizes.x1},
  img: {width: Sizes.x12, height: Sizes.x12, opacity: 0.5},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
