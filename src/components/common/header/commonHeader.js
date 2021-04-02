import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const CommonHeader = ({navigation, title}) => {

const backHandler = () =>{
   navigation.goBack()
  
}
  return (
    
   
      <View style={{ height: 70, width: '100%', backgroundColor: 'black', zIndex:999, paddingLeft: 20, flexDirection:'row', alignItems: 'center'}}>
          <Icon name='arrow-left' size={30} color={'white'} onPress={()=>backHandler()} />
          {title && <Text style={{color: 'white', fontSize: 22, marginLeft:15,}}>{title}</Text>}
      </View>


  );
}
export default CommonHeader
