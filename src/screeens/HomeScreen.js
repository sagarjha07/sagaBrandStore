import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
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
import FilterList from '../components/HomeScreenComponents/FilterList';

const HomeScreen = () => {
  const {posts, loading} = useSelector(state => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAsync());
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        style={{backgroundColor: Colors.white}}>
        <HeaderComponent />
        <View style={styles.filterContainer}>
          <FilterList />
        </View>
        {loading === true ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={Colors.orange} />
          </View>
        ) : (
          <FlatList
            data={posts}
            style={styles.productList}
            showsVerticalScrollIndicator={false}
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
        )}
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  productList: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    paddingTop: Sizes.x2,
  },
  loadingContainer: {
    paddingTop: '50%',
    backgroundColor: Colors.white,
  },
  filterContainer: {
    paddingBottom: Sizes.x2,
    paddingLeft: Sizes.x3,
    paddingTop: Sizes.x2,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 0.2,
  },
});
