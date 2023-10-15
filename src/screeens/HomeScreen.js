import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../constants';
import FilterList from '../components/HomeScreenComponents/FilterList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/icons/tab.png')}
          style={styles.img}
        />
        <Image
          source={require('../../assets/icons/profile.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subTitle}>Best trendy collection!</Text>
      </View>
      <View style={styles.filterContainer}>
        <FilterList />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Sizes.x3,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.x3,
  },
  img: {
    height: Sizes.x3,
    width: Sizes.x3,
  },
  textContainer: {
    paddingVertical: Sizes.x2,
    paddingHorizontal: Sizes.x3,
  },
  title: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.slarge,
    color: Colors.black,
  },
  subTitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
    color: Colors.lightGrey,
  },
  filterContainer: {
    paddingBottom: Sizes.x3,
    marginLeft: Sizes.x3,
  },
});