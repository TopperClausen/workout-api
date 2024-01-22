/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <View style={styles.view}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  view: {
      flex: 1,
      paddingLeft: 6,
      paddingRight: 6
  }
});

export default App;
