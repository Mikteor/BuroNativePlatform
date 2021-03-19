/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Provider as ReduxProvider} from 'react-redux'
import {Provider as PaperProvider} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Application from './Application'
import store from './src/redux/store';
import {navigationRef} from './RootNavigation';

import {Alert} from 'react-native'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'


const App: () => React$Node = () => {

  const [devToken, setToken] = useState('')

  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const getPushData = (message) => {
    console.log('message: ', message)
   const alTitle = message.notification.title
   const alBody = message.notification.body

    Alert.alert(
      alTitle, alBody
      )
  }


  useEffect(()=>{
    getToken()
    const mes = messaging().onMessage(getPushData);
  },[])
  messaging().onMessage(getPushData);
  const getToken = async() => {
    const token = await messaging().getToken()
    console.log('token::',token)
    setToken(token)
  }

 
    // const getBackgroundPushData = (message) => {
    //   PushNotification.localNotification({
    //     channelId: 'channel-id',
    //     title: message.notification.title,
    //     message: message.notification.body,
    //     largeIconUrl: message.notification.android.imageUrl,
    //   })
    //   console.log('message: ', message)
    // }


  return (
    <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider >
            <ReduxProvider store={store}>
              <PaperProvider>
                  <Application deviceToken={devToken} />
              </PaperProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    </NavigationContainer>

  );
};



export default App;
