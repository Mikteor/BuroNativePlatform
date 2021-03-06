import React from 'react';
import { StyleSheet, Text, View, ScrollView,  } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../redux/actions/auth';
import {  getSprint } from '../../redux/actions/projects';


const SprintsTab = ({sprint, userSprintsID, navigation, chosenSprint, editSprint}) => {
const tass = sprint.tasks.map((el,i)=>{
    return el.taskStatus
})
        let finishedTasks = 0
            sprint.tasks.map((task,i)=>{
              task.taskStatus==true && (finishedTasks += 1)
            })
        let percent = sprint.tasks.length>0 ? (finishedTasks/sprint.tasks.length*100) : 0
        let chosen = userSprintsID? userSprintsID.some(id=>id==sprint._id) : false
     

  return (
    
            <View  style={sprintStyle.mainFlex}>

              <Icon style={sprintStyle.icon} name={chosen? 'star':'star-outline'} size={24} color='black' onPress={chosenSprint}/>
              
              <View style={sprintStyle.cardFlex} onTouchEnd={editSprint}>
                <View style={sprintStyle.cardCenter}>
                  <Text style={sprintStyle.title}>{sprint.title&&sprint.title} </Text>
                  <View style={{flexDirection: 'row'}}>
                  {sprint.tags.map((el,i)=>{
                              if(el.length>0){
                                return(
                                  <View key={'histTag'+i} style={sprintStyle.projType}>
                                    <Text style={{color: '#CA9E4D',}}>{el.length>14 ? el.slice(0,15)+'...' : el}</Text>
                                  </View>
                                )
                              }
                            })}
                  </View>
                </View>

                <View>
                  <Text style={sprintStyle.status}>{Math.round(percent)}%</Text>
                </View>
              </View>

            </View>
 


  );
}
export default SprintsTab



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
    marginRight:5,
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
