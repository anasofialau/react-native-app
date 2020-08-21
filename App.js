// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
// import { StyleSheet, Text, View } from 'react-native';


const store = ConfigureStore();

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Hello Ana!! Good night :)</Text>
  //     <Text>Lets learn React!! </Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
