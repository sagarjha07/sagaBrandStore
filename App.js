import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Sizes} from './src/constants';
import Primarybutton from './src/components/common/Primarybutton';
import OnboardingScreen from './src/screeens/OnboardingScreen';
import HomeScreen from './src/screeens/HomeScreen';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

export default App;
