import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screen/RegisterScreen';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';

import userReducers from './src/reducers/userReducers';

const store = legacy_createStore(userReducers);

export default function App() {
  return (
    <Provider store={store}>
      <RegisterScreen />
    </Provider>
  );
}


