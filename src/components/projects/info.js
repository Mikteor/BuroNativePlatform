import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar } from 'react-native';
import { DataTable } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import TouchableScale from 'react-native-touchable-scale';

const Project = ({project}) => {

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
    
 
<View style={{flex:1}}>

            <View style={infoStyle.title}>
                <Icon name='playlist-check' color='#7C7C7C' size={24}/>
                <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Общая информация</Text>
                <ArrowIcon name='keyboard-arrow-down' color='#7C7C7C' size={24}/>
            </View>
<ScrollView>
            <View style={infoStyle.card}>
                <Text style={infoStyle.cardTitle}>Описание проекта</Text>
                <Text style={infoStyle.cardSubtitle}>{project.about}</Text>
            </View>
            <View style={infoStyle.card}>
                <Text style={infoStyle.cardTitle}>Официальное название</Text>
                <Text style={infoStyle.cardSubtitle}>{project.offTitle}</Text>
            </View>
            <View style={infoStyle.cardFlex}>
                <Text style={infoStyle.cardTitle}>Шифр</Text>
                <Text style={infoStyle.cardSubtitle}>{project.crypter}</Text>
            </View>
            <View style={infoStyle.cardFlex}>
                <Text style={infoStyle.cardTitle}>Бюджет</Text>
                <Text style={infoStyle.cardSubtitle}>ссылка {project.budget}</Text>
            </View>
            <View style={infoStyle.cardFlex}>
                <Text style={infoStyle.cardTitle}>Документация</Text>
                <Text style={infoStyle.cardSubtitle}>ссылка {project.cusStorage}</Text>
            </View>
            <View style={infoStyle.cardFlex}>
                <Text style={infoStyle.cardTitle}>График</Text>
                <Text style={infoStyle.cardSubtitle}>ссылка {project.schedule}</Text>
            </View>
            <View style={infoStyle.card}>
                <Text style={infoStyle.cardTitle}>Заказчик</Text>
                <Text style={infoStyle.cardSubtitle}>телефон</Text>
                <Text style={infoStyle.cardSubtitle}>заказчик: {project.customer}</Text>
                <Text style={infoStyle.cardSubtitle}>почта</Text>
                <Text style={infoStyle.cardSubtitle}>другие документы</Text>
            </View>
            </ScrollView>
  </View>

  


  );
}
export default Project



  const modelStyle = StyleSheet.create({
   
  });
  const infoStyle = StyleSheet.create({
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        marginBottom: 5,
        paddingBottom: 3,
      },
    card: {
        marginHorizontal: 15,
        marginVertical: 4,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8,

    },
    cardFlex: {
        marginHorizontal: 15,
        marginVertical: 4,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",

    },
    cardTitle:{
        fontWeight: "bold",
        fontSize: 16,
    },
    cardSubtitle: {

    }

  });





