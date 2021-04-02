import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, RefreshControl, ActivityIndicator } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'


const Loading = ({visible, closeModal, confirm, reject, title, subtitle, delet, finish}) => {


  return (
    

            <View style={styles.container} >
                <ActivityIndicator size={60} color="white" />
            </View>





  


  );
}
export default Loading



  const styles =  StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
 
  });
