import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Colors,
  FontFamily,
  FontSize,
  Sizes,
  productFilterData,
} from '../../constants';
import {useDispatch} from 'react-redux';
import {getPostsAsync} from '../../redux/slices/postsSlice';

const FilterList = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef();

  const dispatch = useDispatch();

  const onFilterClick = (filter, index) => {
    setCurrent(index);
    scrollToFilter(index);
    if (filter === 'ALL') dispatch(getPostsAsync());
    else dispatch(getPostsAsync(filter));
  };

  const scrollToFilter = index => {
    ref?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={productFilterData}
      ref={ref}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={[
              styles.filter,
              {
                marginRight:
                  index === productFilterData.length - 1 ? Sizes.x3 : Sizes.x1,
                backgroundColor: current === index ? Colors.orange : null,
              },
            ]}
            onPress={() => {
              onFilterClick(item, index);
            }}>
            <Text
              style={[
                styles.filterTitle,
                {color: current === index ? Colors.white : Colors.black},
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item}
    />
  );
};

export default FilterList;

const styles = StyleSheet.create({
  filter: {
    paddingVertical: Sizes.x1 / 2,
    paddingHorizontal: Sizes.x2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.x2,
  },
  filterTitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.medium,
  },
});
