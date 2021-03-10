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
import {Provider as ReduxProvider} from 'react-redux'
import {Provider as PaperProvider} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Application from './Application'
import store from './src/redux/store';
import {navigationRef} from './RootNavigation';






const App: () => React$Node = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider >
            <ReduxProvider store={store}>
              <PaperProvider>
                  <Application />
              </PaperProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    </NavigationContainer>

  );
};



export default App;
