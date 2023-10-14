import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Sizes} from './src/constants';
import Primarybutton from './src/components/common/Primarybutton';

const App = () => {
  return (
    <View style={{padding: 30}}>
      <Primarybutton width={Sizes.x15} height={Sizes.x6} title={'Log In'} />
    </View>
  );
};

export default App;
