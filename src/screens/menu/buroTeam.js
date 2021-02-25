import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput,  Modal } from 'react-native';
import { ListItem, Divider, Overlay, Button } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';

const BuroTeam = ({navigation}) => {
const dispatch = useDispatch()


  return (
    
    <ScrollView style={styles.container}>
  

    </ScrollView>
  );
}
export default BuroTeam

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3F496C',
    },

  });

