import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {  Button } from 'react-native-elements'

import { DataTable } from 'react-native-paper';

const Project = ({}) => {

  const [onPress, setOnpress] = useState(false)
  const projects = [1,2,3,4,5]
  const finishedProjects = [1,2,]

  return (
    
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Название спринта</Text>
        <Text>Дней до дедлайна: 3</Text>
        <Text>Стадия: проект</Text>

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


        <Text style={styles.title}>Команда</Text>

        <View style={styles.card}>
            <View style={styles.profileFlex}>
                <Image source={require('../../../assets/ava.jpeg')} style={styles.avatar}/>
                <View>
                    <Text style={styles.name}>Mitya Pustovitenko</Text>
                    <Text style={styles.pos}>mobile developer</Text>
                </View>
            </View>
            <Button title='Профиль' containerStyle={styles.btnProf}/>
        </View>
        


    </ScrollView>
  );
}
export default Project

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C4C4C4',
      // alignItems: 'center',
      // justifyContent: 'center',
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

      profileFlex: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
      },
      avatar: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginRight: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        width: 200,
        // backgroundColor: 'red'
      },
      btnProf: {
        borderRadius: 13,
        width: 150,
        marginLeft: 'auto',
      },
  });

