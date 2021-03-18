import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider } from 'react-native-paper';
import { Button, CheckBox, colors, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../redux/actions/auth';
import { usersPartition } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';
import { addTask, deleteSprint, getProject, finishSprint, finishTask, DeleteTask, getSprint, selectedProject } from '../../redux/actions/projects';


const Project = ({project, navigation}) => {


  return (
    
 

        <View style={sprintStyle.container}>
       

          <View>
            <ScrollView>
              <DataTable>
                    {project.sprints
                      .filter(el => el.status)
                      .map((el,i)=>{
                      return(
                        
                        <DataTable.Row style={sprintStyle.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('openSprint', {historyScreen: true})} >
                          <DataTable.Cell style={{flex: 1,}}>Спринт {el.dateOpen.slice(5,10).split('-').reverse().join('.')}</DataTable.Cell>
                         
                          <DataTable.Cell  numeric>
                            <View style={sprintStyle.projType}>
                              <Text style={{color: '#CA9E4D',}}>{project.stage}</Text>
                            </View>
                          </DataTable.Cell>
                          <DataTable.Cell style={{flex: .6}} numeric>
                            <Icon name='circle' color='green' size={14}/>
                          </DataTable.Cell>
                        </DataTable.Row>
                      )
                      
                    })}
          </DataTable>
          </ScrollView>
          </View>


    
                {/* <Icon name='circle' color={now<finish? 'green' : now>finish && percent<100?'red': 'green'} size={14} style={sprintStyle.statusDot}/> */}




        </View>

  


  );
}
export default Project



  const sprintStyle =  StyleSheet.create({
   container:{
     flex:1,
   },
   sprints:{
    // backgroundColor: 'green',
    flex: 1
    },
   card:{
    backgroundColor: 'white',
    elevation: 8,
    // marginVertical: 10,
    marginBottom:20,
    marginHorizontal: 40,
    borderRadius: 8,
    shadowColor: 'black',
    // marginTop: -20,
    paddingHorizontal:10,
    paddingVertical:5,
  },
  topFlex:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    marginLeft: 5,
  },
  botFlex:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:{
    fontSize: 18,
  },
  status:{
    fontSize: 18,
    marginLeft: 'auto',

  },
  description:{
    marginBottom: 8,
  },
  type:{
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },

  history:{
    // backgroundColor: 'yellow',
  },
  histTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 5,
    paddingBottom: 3,
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
  projType2: {
    backgroundColor: '#E1E7F2',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCont: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  }
  });
