import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const CommonHeader = ({navigation}) => {


  return (
    
   
      <View style={{ height: 70, width: '100%', backgroundColor: '#3F496C', zIndex:999, paddingLeft: 20, justifyContent: 'center'}}>
          <Icon name='arrow-left' size={30} color={'white'} onPress={()=>navigation.pop()} />
      </View>


  );
}
export default CommonHeader
