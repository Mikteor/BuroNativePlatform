import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NotificationBell from './notificationBell'

const CommonHeader = ({navigation, title}) => {

const backHandler = () =>{
   navigation.goBack()
  
}
  return (
    
   
      <View style={{ height: 70, width: '100%', backgroundColor: 'black', zIndex:999, paddingHorizontal: 20, flexDirection:'row', justifyContent: 'space-between', alignItems:'center' }}>
          <Text style={{color: 'white', fontSize: 22,}}>{title}</Text>
          <NotificationBell />
      </View>


  );
}
export default CommonHeader
