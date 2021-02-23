import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { DataTable } from 'react-native-paper';

const Projects = ({navigation}) => {

  const projects = [1,2,3,4,5]
  const finishedProjects = [1,2,]

  return (
    
    <ScrollView style={styles.container}>
        <Text style={styles.title} >Текущие проекты</Text>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection='descending' style={{flex: 4,}}>Название</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Дедлайн</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Статус</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Спринты</DataTable.Title>
        </DataTable.Header>
      
        {projects.map((el,i)=>{
          return(
          <DataTable.Row onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 4,}}>Название крупного проекта с длинным названием</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>3</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>...</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>4</DataTable.Cell>
          </DataTable.Row>
          )
          
        })}

        <View style={{marginVertical: 30}}/>

        <Text style={styles.title}>Завершенные проекты</Text>
        <DataTable.Header>
          <DataTable.Title sortDirection='descending' style={{flex: 4,}}>Название</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Дедлайн</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Статус</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Спринты</DataTable.Title>
        </DataTable.Header>
        {finishedProjects.map((el,i)=>{
          return(
            <DataTable.Row key={'finishedProjects'+i} onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 4,}}>Название крупного проекта с длинным названием</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>3</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>...</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>4</DataTable.Cell>
          </DataTable.Row>
          )
         
     
        })}
        </DataTable> 

    </ScrollView>
  );
}
export default Projects

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C4C4C4',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
 smallHeadCell: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,

 },
 smallCell: {
  alignContent: 'center',
  paddingHorizontal: 3,
  
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  marginHorizontal: 10,
  marginVertical: 10,
  paddingBottom: 10,
},

  });

