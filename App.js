/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Application from './Application'
import store from './src/redux/store';
import {navigationRef} from './RootNavigation';






const App: () => React$Node = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider >
            <Provider store={store}>
                <Application />
            </Provider>
        </SafeAreaProvider>
    </NavigationContainer>

  );
};



export default App;
