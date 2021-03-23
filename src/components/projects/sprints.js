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
import {  getSprint } from '../../redux/actions/projects';


const Project = ({project, navigation}) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  const userSprints = user&& user.sprints && user.sprints.map(el=>el._id)


  const chosenSprint = (id) => {

    dispatch(addToChosen(id));
    dispatch(loadUser())
  }
  const editSprint = (id) => {
    
    dispatch(getSprint(id))
    navigation.navigate('openSprint',{project: project})
  }
 

  return (
    
 

  <View style={sprintStyle.container}>
      <ScrollView>
          


      {project.sprints
      .filter(el => !el.status)
      .map((el,i)=>{
        let finishedTasks = 0
            el.tasks.map((task,i)=>{
              task.taskStatus==true && (finishedTasks += 1)
            })
        let percent = el.tasks.length!=0 ? (finishedTasks/el.tasks.length*100) : 0
        let chosen = userSprints? userSprints.some(id=>id==el._id) : false
        const now = new Date()
        const finish = new Date(el.dateClosePlan)
        return(
            <View key={'sprints'+i} style={sprintStyle.mainFlex}>

              <Icon style={sprintStyle.icon} name={chosen? 'star':'star-outline'} size={24} color='black' onPress={()=>chosenSprint(el._id)}/>
              
              <View style={sprintStyle.cardFlex} onTouchEnd={(e)=>editSprint(el._id)}>
                <View style={sprintStyle.cardCenter}>
                  <Text style={sprintStyle.title}>{el.title&&el.title} </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={sprintStyle.type}  >
                      <Text style={{color: '#CA9E4D',}}>{project.stage}</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={sprintStyle.status}>{Math.round(percent)}%</Text>
                </View>
              </View>

            </View>
        )
      })}
          </ScrollView>


  </View>

  


  );
}
export default Project



  const sprintStyle =  StyleSheet.create({
   container:{
     flex:1,
   },
  
    mainFlex: {
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center',
      borderBottomWidth: 0.5,

    },
    cardFlex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      paddingRight: 10,
      paddingVertical: 5,
      backgroundColor: 'white',
    },
    icon: {
      marginHorizontal: 10,
    },
    cardCenter: {
      marginVertical:8,
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
    marginBottom: 5,
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
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 65,
    right: 0,
    bottom: 0,
    backgroundColor:'#3F496C'
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
