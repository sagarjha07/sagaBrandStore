import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;
