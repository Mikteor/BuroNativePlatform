import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, RefreshControl, ActivityIndicator } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'
import Logo from '../../../assets/logo'

const Loading = ({visible, closeModal, confirm, reject, title, subtitle, delet, finish}) => {


  return (
    

            <View style={styles.container} >
                <Logo />
            </View>





  


  );
}
export default Loading



  const styles =  StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center'
  },
 
  });
