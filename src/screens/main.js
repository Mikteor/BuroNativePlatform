import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login, logOut } from '../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon } from 'react-native-elements'



const Main = ({exit}) => {
const dispatch = useDispatch()

  return (
    
    <View style={styles.container}>
 

      <Text>hello, it's MAINs</Text>
      <Icon name="folder" color='#900' />
      <Button  title='removeToken' onPress={()=>dispatch(logOut())} />
      
      

  

    </View>
  );
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C4C4C4',
      alignItems: 'center',
      justifyContent: 'center',
    },
  exitButton: {
    
  }
  });

