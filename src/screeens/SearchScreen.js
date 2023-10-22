import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../constants';
import databaseService from '../appwrite/DatabaseService';
import SearchCard from '../components/SearchScreenComponents/SearchCard';

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
            <ActivityIndicator size={'large'} color={Colors.orange} />
          </View>
        ) : (
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
    borderColor: Colors.orange,
    borderWidth: 1,
    color: Colors.lightGrey,
  },
  flatListContainer: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.x4,
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
});
