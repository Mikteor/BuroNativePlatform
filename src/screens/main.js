import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput,   } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native';
import Projects from './menu/projects/projects';
import { DataTable } from 'react-native-paper';



const Main = ({navigation}) => {
const dispatch = useDispatch()


const flexs = ['OB', 'AP', 'ПП','ПП','ПП']
const projects = [1,2,3,4,5]

  return (
    
<View style={styles.container}>
      <View style={{height: 100, backgroundColor: 'black',}}/>
 
      <View style={styles.profileTop}>
        <Image source={require('../../assets/ava.jpeg')} style={styles.avatar}/>
        <Text style={styles.name}>Mitya Pustovitenko</Text>
        <Text style={styles.pos}>mobile developer</Text>
      </View>


<ScrollView>
  
      <View style={styles.flexTop}>
        {flexs.map((el,i)=>{
          return(
            <View key={'flexs'+i} style={styles.flexItem}>
              <Text style={{color: '#7296FB'}}>{el}</Text>
            </View>
          )
        })}
      </View>


<View style={styles.scrollView}>

      <View style={styles.title}>
          <Icon name='playlist-check' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Новости</Text>
          <Button title='Все новости' type='clear' onPress={()=>navigation.navigate('news')}
                  titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
                  containerStyle={{height:30, justifyContent: 'center',}}
                  icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
                  iconRight={true}
                  />
          
      </View>

      <DataTable>
      {projects.map((el,i)=>{
        if (i<3){
        return(
          
          <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 2,}}>Название новости длинной</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>
              <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>объявление</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>11.06</DataTable.Cell>
          </DataTable.Row>
        )} 
        
      })}
      </DataTable>

      <View style={styles.title}>
          <Icon name='playlist-check' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Мои проекты</Text>
          <Button title='Все проекты' type='clear' 
                  titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
                  containerStyle={{height:30, justifyContent: 'center',}}
                  icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
                  iconRight={true}
                  />
      </View>

      <DataTable>
      {projects.map((el,i)=>{
        return(
          
          <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 1,}}>Название крупного проекта с длинным названием</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>35 дней</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>
              <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>архитектура</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{flex: .3}} numeric>
              <Icon name='circle' color='green' size={14}/>
            </DataTable.Cell>
          </DataTable.Row>
        )
        
      })}
      </DataTable>




     


</View>
   
    
</ScrollView>
      

  

    </View>
  );
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#fff',

      // alignItems: 'center',
      // justifyContent: 'center',
    },

    profileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: -60,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    pos: {
      color: 'grey',
    },
    flexTop:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 15,
    },
    flexItem: {
      paddingHorizontal: 25,
      paddingVertical: 3,
      backgroundColor: '#F1F5FF',
      borderRadius: 7,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    scrollView:{
      backgroundColor: '#F8FAFB',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginTop: 35,
    },
    tableRow: {
      backgroundColor: 'white',
      marginVertical: 2,
      padding: 0,
    },
    projType: {
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
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
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#DDDDDD',
      marginBottom: 5,
      paddingBottom: 3,
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

