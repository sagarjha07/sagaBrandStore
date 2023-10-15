import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Colors,
  FontFamily,
  FontSize,
  Sizes,
  productFilterData,
} from '../../constants';

const FilterList = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef();
  const onFilterClick = index => {
    //TODO:implement Api call
    setCurrent(index);
    scrollToFilter(index);
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
                  index === productFilterData.length - 1 ? Sizes.x3 : Sizes.x2,
                backgroundColor: current === index ? Colors.orange : null,
              },
            ]}
            onPress={() => {
              onFilterClick(index);
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
