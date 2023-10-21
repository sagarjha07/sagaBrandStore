import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import ScreensNavigator from './ScreensNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import SplashScreen from '../screeens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  if (true) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      {true ? <AuthNavigator /> : <ScreensNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
