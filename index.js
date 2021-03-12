/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    channelId: 'channel-id',
    title: message.notification.title,
    message: message.notification.body,
    largeIconUrl: message.notification.android.imageUrl,
  })
});

AppRegistry.registerComponent(appName, () => App);
