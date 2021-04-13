import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, RefreshControl, ActivityIndicator } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'


const Loading = ({reverse, small}) => {


  return (
    

            <View style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: reverse? 'white' : 'black',
            }} >
                <ActivityIndicator size={small?40: 60} color={reverse?'black':"white"} />
            </View>





  


  );
}
export default Loading



  const styles =  StyleSheet.create({

 
  });
