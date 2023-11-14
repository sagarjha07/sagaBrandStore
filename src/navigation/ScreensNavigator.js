import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screeens/ProductDetailScreen';
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
    </Stack.Navigator>
  );
};

export default ScreensNavigator;
