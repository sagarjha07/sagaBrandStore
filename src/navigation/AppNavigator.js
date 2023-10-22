import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import ScreensNavigator from './ScreensNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants';
import SplashScreen from '../screeens/SplashScreen';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isLoggedIn, loading} = useSelector(state => state.user);
  if (loading) {
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
      {!isLoggedIn ? <AuthNavigator /> : <ScreensNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
