import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import storageService from '../appwrite/StorageService';
import {APPWRITE_ONBOARDING_IMAGE_FILE_ID} from '@env';
import {Colors, FontFamily, FontSize, Routes, Sizes} from '../constants';
import SecondaryButton from '../components/common/SecondaryButton';
import Primarybutton from '../components/common/Primarybutton';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();

  const getImageUrl = () => {
    return storageService.getImageById(APPWRITE_ONBOARDING_IMAGE_FILE_ID);
  };

  useEffect(() => {
    const result = getImageUrl();
    setImageUrl(result);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.img} />}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Find The Best Collections</Text>
        <Text style={styles.subTitle}>
          Get your dream item easily with FashionHub and get other intersting
          offer
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton
          title="Sign Up"
          width={'48%'}
          height={Sizes.x6}
          onPress={() => {
            navigation.navigate(Routes.SIGNUP);
          }}
        />
        <Primarybutton
          title="Log In"
          width={'48%'}
          height={Sizes.x6}
          onPress={() => {
            navigation.navigate(Routes.LOGIN);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  img: {
    width: width,
    aspectRatio: 0.9,
    objectFit: 'cover',
    borderBottomLeftRadius: Sizes.x6,
    borderBottomRightRadius: Sizes.x6,
  },
  textContainer: {
    paddingHorizontal: Sizes.x3,
    marginTop: Sizes.x3,
  },
  title: {
    fontSize: FontSize.xlarge,
    fontFamily: FontFamily.regular,
    color: Colors.black,
  },
  subTitle: {
    fontFamily: FontFamily.regular,
    color: Colors.lightGrey,
    marginTop: Sizes.x1 / 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: Sizes.x3,
    marginTop: Sizes.x3,
    justifyContent: 'space-between',
  },
});
