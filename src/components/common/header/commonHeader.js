import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const CommonHeader = ({navigation}) => {

const backHandler = () =>{
   navigation.goBack()
  
}
  return (
    
   
      <View style={{ height: 70, width: '100%', backgroundColor: 'black', zIndex:999, paddingLeft: 20, justifyContent: 'center'}}>
          <Icon name='arrow-left' size={30} color={'white'} onPress={()=>backHandler()} />
      </View>


  );
}
export default CommonHeader
