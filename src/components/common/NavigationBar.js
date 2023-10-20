import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const NavigationBar = ({title}) => {
  const navigation = useNavigation();
  const onBackClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity onPress={onBackClick}>
        <Image
          style={styles.img}
          source={require('../../../assets/icons/back.png')}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  navigationBar: {
    marginTop: Sizes.x2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: Sizes.x2,
    height: Sizes.x2,
  },
  title: {
    paddingLeft: Sizes.x1,
    color: Colors.black,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xmedium,
  },
});
