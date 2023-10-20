import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Sizes} from '../constants';
import HeaderComponent from '../components/HomeScreenComponents/HeaderComponent';
import ProductCard from '../components/HomeScreenComponents/ProductCard';
import databaseService from '../appwrite/DatabaseService';
import {useDispatch, useSelector} from 'react-redux';
import {getPostsAsync} from '../redux/slices/postsSlice';

const HomeScreen = () => {
  const {posts, loading} = useSelector(state => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAsync());
  }, []);

  if (loading === true) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colors.orange} />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      style={styles.productList}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<HeaderComponent />}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              paddingLeft: index % 2 === 1 ? Sizes.x3 : null,
              marginBottom: index === posts.length - 1 ? Sizes.x7 : null,
            }}>
            <ProductCard data={item} />
          </View>
        );
      }}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  productList: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
