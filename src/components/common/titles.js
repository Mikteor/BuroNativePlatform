import React from 'react';
import { View ,StyleSheet , Text,  } from 'react-native';
import {Button, ListItem, } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'


const CommonTitle = ({navigation, icon, title, button}) => {


  return (
    
   
    <View style={styles.title}>
        <Icon name={icon} color='#7C7C7C' size={24}/>
        <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>{title}</Text>
        {button && <Button title={button.title} type='clear' 
                  titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
                  containerStyle={{height:30, justifyContent: 'center',}}
                  icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
                  iconRight={true}
                  onPress={button.onPress}
                  />}
    </View>


  );
}
export default CommonTitle


const styles = StyleSheet.create({

title: {
  display: 'flex',
  flexDirection: 'row',
  marginHorizontal: 15,
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: '#DDDDDD',
  marginBottom: 5,
  paddingBottom: 3,
  marginTop: 20,
},
})