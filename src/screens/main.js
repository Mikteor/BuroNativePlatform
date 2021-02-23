import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login, logOut } from '../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput,   } from 'react-native';
import {  Button } from 'react-native-elements'

// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Icon, Divider } from 'react-native-elements'
import { ScrollView } from 'react-native';



const Main = ({navigation}) => {
const dispatch = useDispatch()

  return (
    
    <ScrollView style={styles.container}>
 
      <View style={styles.profileFlex}>
        <Image source={require('../../assets/ava.jpeg')} style={styles.avatar}/>
        <View>
           <Text style={styles.name}>Mitya Pustovitenko</Text>
           <Text style={styles.pos}>mobile developer</Text>
        </View>
      </View>

      <Text style={styles.title}>Новости</Text>

      <View style={styles.card}>
          <Text style={{textAlign: 'right'}}>01.20</Text>
          <Text>Имя фамилия</Text>
          <Text style={styles.newsTitle} numberOfLines={1}>Большое и длинное название новости</Text>
      </View>
      <Button type='clear' title='Все новости' containerStyle={{marginLeft: 'auto', marginRight: 10,}} onPress={()=>navigation.navigate('news')}/>

      <Text style={styles.title}>Мои проекты</Text>

      <View style={styles.card}>
          <Text style={{textAlign: 'right'}}>активный</Text>
          <Text style={{textAlign: 'right'}}>7 дней</Text>
          <Text style={styles.projTitle} numberOfLines={1}>Название проекта</Text>
          <Text style={{marginRight: 50}}>Короткое описание проекта вот тут. Кто о чем куда где</Text>
          <View style={styles.projectFlex}>
            <Text>#smth</Text>
            <Button title='Подробнее' containerStyle={{width: 150,borderRadius: 13,}}/>
          </View>
          
      </View>

    
      
      

  

    </ScrollView>
  );
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C4C4C4',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    profileFlex: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 100,
      marginRight: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      width: 200,
      // backgroundColor: 'red'
    },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      marginHorizontal: 10,
      marginVertical: 20,
      paddingBottom: 10,
    },
    projectFlex: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
    },
  });

