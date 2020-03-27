import 'intl';
import 'intl/locale-data/jsonp/en-US';

import React from 'react';
import { Text, View } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   }
// });
