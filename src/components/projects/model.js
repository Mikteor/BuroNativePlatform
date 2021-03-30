import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar } from 'react-native';
import { DataTable } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import TouchableScale from 'react-native-touchable-scale';

const Project = ({}) => {

  const [selectedButton, setButton] = useState(0)

  
  const buttons = ['Спринты', 'Команда','Модель','Информация']
  const sprints = [1,2,3,4,5,6,7,8]
  const team = [1,2,3,4,5,6,7,8]
  const flexs = ['OB', 'AP',]

  const btnGroup = (e) => {
    // console.log(e)
    setButton(e)
  }

  return (
    
 
<View style={{flex:1, height:530, backgroundColor:'white', }}>

    {/* <Text style={{alignSelf: 'center', marginVertical: '50%'}}>В разработке</Text> */}

    <Image source={require('../../../assets/development.png')} style={{alignSelf: 'center', marginTop: 40, }} />

    {/* <View style={modelStyle.controlPanelContainer}>
        <View style={modelStyle.controlPanel}>
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
        </View>
        <View style={modelStyle.controlPanel}>
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
        </View>
        <View style={modelStyle.controlPanel}>
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
            <Icon style={modelStyle.icon} name='camera-control' color='white' size={24} />
        </View>
    </View> */}
        
</View>
  
  
  );
}
export default Project


  const styles = StyleSheet.create({
   
    controlPanelContainer: {
        position: 'absolute',
        bottom: 50,
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    controlPanel: {
        backgroundColor: '#3F496C',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
    },
    icon: {
        marginHorizontal: 8,
    },
  });





