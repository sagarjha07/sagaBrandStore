import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import LoginScreen from '../screeens/LoginScreen';
import SignupScreen from '../screeens/SignupScreen';
import OnboardingScreen from '../screeens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Routes.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
