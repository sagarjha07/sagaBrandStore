import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Routes, Sizes} from '../constants';
import HomeScreen from '../screeens/HomeScreen';
import CartScreen from '../screeens/CartScreen';
import SearchScreen from '../screeens/SearchScreen';
import SettingsScreen from '../screeens/SettingsScreen';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.white,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/icons/home.png')}
                style={[
                  styles.img,
                  {tintColor: focused ? Colors.orange : Colors.white},
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/icons/search.png')}
                style={[
                  styles.img,
                  {tintColor: focused ? Colors.orange : Colors.white},
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.CART}
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/icons/cart.png')}
                style={[
                  styles.img,
                  {tintColor: focused ? Colors.orange : Colors.white},
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={Routes.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../../assets/icons/settings.png')}
                style={[
                  styles.img,
                  {tintColor: focused ? Colors.orange : Colors.white},
                ]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  img: {
    objectFit: 'contain',
    height: Sizes.x5 / 2,
    width: Sizes.x5 / 2,
    tintColor: Colors.white,
  },
  tabBarStyle: {
    backgroundColor: Colors.black,
    position: 'absolute',
    bottom: Sizes.x3 / 2,
    left: Sizes.x1,
    right: Sizes.x1,
    borderRadius: Sizes.x2,
    opacity: 0.8,
  },
});
