import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Sizes} from '../constants';
import databaseService from '../appwrite/DatabaseService';
import LottieView from 'lottie-react-native';
import NavigationBar from '../components/common/NavigationBar';
import OrderCard from '../components/OrderScreenComponents/OrderCard';

const OrderScreen = () => {
  const [orderList, setOrderList] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await databaseService.getAllOrders();
      setOrderList(res);
    })();
  }, []);

  if (!orderList) {
    return (
      <>
        <View style={styles.nav}>
          <NavigationBar title={'My Orders'} />
        </View>
        <LottieView
          style={styles.lottie}
          source={require('../../assets/lottie/loading.json')}
          autoPlay
          loop
          resizeMode="contain"
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationBar title={'My Orders'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderList}
        contentContainerStyle={styles.flatlist}
        renderItem={({item, index}) => <OrderCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
    marginBottom: Sizes.x4,
  },
  flatlist: {
    paddingTop: Sizes.x5,
    paddingHorizontal: Sizes.x1 / 2,
  },
  nav: {
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.x3,
  },
  lottie: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
  },
});
