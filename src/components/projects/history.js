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
import Loading from '../common/loadingScreen';


const Project = ({ navigation}) => {
const dispatch = useDispatch()
const sprints = useSelector(state=> state.projects.sprints)
const sprintClick = (id) => {
  dispatch(getSprint(id))
  navigation.navigate('openSprint', {historyScreen: true})
}

if(!sprints){
  return <Loading reverse/>
}
  return (
    
 

        <View style={sprintStyle.container}>
       

          <View>
            <ScrollView>
              <DataTable>
                    {sprints && sprints
                      .filter(el => el.status)
                      .map((el,i)=>{
                        let done = el.tasks.every(el=>el.taskStatus==true)
                      return(
                        
                        <DataTable.Row style={sprintStyle.tableRow} key={'projj'+i} onPress={()=>sprintClick(el._id)} >
                          <DataTable.Cell style={{flex: 1,}}>{el.title&&el.title}</DataTable.Cell>
                         
                          <DataTable.Cell  numeric>
                            {el.tags.map((el,i)=>{
                              if(el.length>0){
                                return(
                                  <View key={'histTag'+i} style={sprintStyle.projType}>
                                    <Text style={{color: '#CA9E4D',}}>{el.length>3 ? el.slice(0,4)+'...' : el}</Text>
                                  </View>
                                )
                              }
                              
                              
                            })}
                            
                          </DataTable.Cell>
                          <DataTable.Cell style={{flex: .6}} numeric>
                            <Icon name='circle' color={done?'green':'firebrick'} size={14}/>
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
