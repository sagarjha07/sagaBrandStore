import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import ScreensNavigator from './ScreensNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {true ? <AuthNavigator /> : <ScreensNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
