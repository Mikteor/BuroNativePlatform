import React from 'react';
import { StyleSheet, Text, View, ScrollView,  } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../redux/actions/auth';
import {  getSprint } from '../../redux/actions/projects';
import Loading from '../common/loadingScreen';
import SprintRow from './sprintRow'

const SprintsTab = ({ navigation}) => {
  const dispatch = useDispatch()

  const sprints = useSelector(state =>state.projects.sprints)
  const userSprints = useSelector(state =>state.auth.user && state.auth.user.sprints)
  const userSprintsID = userSprints && userSprints.map(el=>el._id)


  const chosenSprint = (id) => {
    dispatch(addToChosen(id));
  }
  const editSprint = (id) => {
    dispatch(getSprint(id))
    navigation.navigate('openSprint',{historyScreen: false})
  }
 

 if(!sprints) {
   return(
     <Loading reverse />
   )
 } 
  return (

  <View style={sprintStyle.container}>
      <ScrollView>

      {sprints && sprints
      .filter(el => !el.status)
      .map((el,i)=>{
        return(
            <SprintRow key={'sprints'+i} sprint={el} userSprintsID={userSprintsID} chosenSprint={()=>chosenSprint(el._id)} editSprint={()=>editSprint(el._id)} />
        )
      })}
          </ScrollView>


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
