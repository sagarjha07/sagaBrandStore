import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, FontSize, Sizes} from '../../constants';

const OrderCard = props => {
  const {$id, numOfItems, totalPayment} = props.item;
  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>
        <Text style={{...styles.orderId, color: Colors.lightGrey}}>
          Order ID :{' '}
        </Text>{' '}
        {$id}
      </Text>
      <View style={styles.info}>
        <Text style={styles.orderId}>
          <Text
            style={{
              ...styles.orderId,
              color: Colors.lightGrey,
              fontSize: FontSize.medium,
            }}>
            Items Count :{' '}
          </Text>
          {numOfItems}
        </Text>
        <Text style={styles.orderId}>
          <Text
            style={{
              ...styles.orderId,
              color: Colors.lightGrey,
              fontSize: FontSize.medium,
            }}>
            Total Price :{' '}
          </Text>
          {totalPayment}
        </Text>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    height: Sizes.x10,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: Sizes.x2,
    padding: Sizes.x2,
    marginBottom: Sizes.x4,
    elevation: 5,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  orderId: {
    fontFamily: FontFamily.regular,
    color: Colors.orange,
    fontSize: FontSize.xmedium,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
