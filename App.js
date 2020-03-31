import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { APP_NAME, PRIMARY_COLOR, SECONDARY_COLOR, LIGHT_COLOR } from 'react-native-dotenv';
import Routers from './src/routers';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor={PRIMARY_COLOR} barStyle='light-content' />
      <Routers/>
    </>
  );
};

export default App;
