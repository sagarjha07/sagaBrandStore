import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screeens/ProductDetailScreen';
import OrderSuccessScreen from '../screeens/OrderSuccessScreen';
import OrderScreen from '../screeens/OrderScreen';
const Stack = createNativeStackNavigator();

const ScreensNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.HOME_TAB} component={TabNavigator} />
      <Stack.Screen
        name={Routes.PRODUCT_DETAILS}
        component={ProductDetailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={Routes.ORDER_SUCCESS}
        component={OrderSuccessScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name={Routes.ORDERS}
        component={OrderScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreensNavigator;
