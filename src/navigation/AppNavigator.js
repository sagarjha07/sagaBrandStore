import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screeens/ProductDetailScreen';
import LoginScreen from '../screeens/LoginScreen';
import SignupScreen from '../screeens/SignupScreen';
import OnboardingScreen from '../screeens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={Routes.HOME_TAB} component={TabNavigator} />
        <Stack.Screen
          name={Routes.PRODUCT_DETAILS}
          component={ProductDetailScreen}
        />
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Routes.SIGNUP} component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
