import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProject } from '../../../redux/actions/projects'

const Projects = ({navigation}) => {

  const dispatch = useDispatch()

  const projects = useSelector(state=>state.projects.projects)
  const finishedProjects = [1,2,]
  
  const projectPress = (crypt) => {
    dispatch(selectedProject(crypt))
    navigation.navigate('project')
  }

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
      
        {!projects? <Text>Нет проектов</Text> : 
          projects
          .filter((project) => !project.status)
          .map((el,i)=>{
            let doneSprints = 0
            for(let i=0; i<el.sprints.length; i++){
              el.sprints[i].status==true && (doneSprints += 1 )
            }
          return(
          <DataTable.Row key={'projeccts'+i} onPress={()=>projectPress(el.crypt)} >
            <DataTable.Cell style={{flex: 4,}}>{el.title}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{el.dateFinish ? el.dateFinish.slice(5,10).split('-').reverse().join('.') : '-'}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>...</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{doneSprints +'/'+ el.sprints.length}</DataTable.Cell>
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
        {!projects? <Text>Нет проектов</Text> : 
          projects
          .filter((project) => project.status)
          .map((el,i)=>{
            let doneSprints = 0
            for(let i=0; i<el.sprints.length; i++){
              el.sprints[i].status==true && (doneSprints += 1 )
            }
          return(
            <DataTable.Row key={'finishedProjects'+i} onPress={()=>navigation.navigate('project')} >
            <DataTable.Cell style={{flex: 4,}}>{el.title}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{el.dateFinish && el.dateFinish.slice(5,10).split('-').reverse().join('.')}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>...</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{doneSprints +'/'+ el.sprints.length}</DataTable.Cell>
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
      backgroundColor: '#F1F5FF',
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

