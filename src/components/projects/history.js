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
  const dispatch = useDispatch()
  const ref = useRef(null)

  const user = useSelector(state => state.auth.user)
  const userSprints = user.sprints.map(el=>el._id)
  const sprint = useSelector(state => state.projects.sprint)


  const [openHistory, setOpenHistory] = useState(false)
  const [newTaskFrom, setnewTaskFrom] = useState(false)
  const [newTaskData, setnewTaskData] = useState('')
  const [openSprint, setOpenSprint] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)
  const [openNewSprintForm, setOpenNewSprintForm] = useState(false)

// useEffect(()=>{
//   sprint && setOpenSprint(true)
// },[sprint])
  

  const chosenSprint = (id) => {

    dispatch(addToChosen(id));
    dispatch(loadUser())
  }
  const editSprint = (id) => {
    
    dispatch(getSprint(id))
    navigation.navigate('openSprint')
  }
  const addNewTask = () => {
    // console.log(sprint._id, newTaskData)
    dispatch(addTask(sprint._id, newTaskData))
    setnewTaskFrom(false)
    ref.current.clear()
    setTimeout(() => {
      dispatch(getSprint(sprint._id))
    }, 300);
  }
  const cancelNewTask = () => {
    setnewTaskFrom(false)
    ref.current.clear()
  }
  const deleteSprintFunc = () => {
    dispatch(deleteSprint(sprint._id))
    setOpenSprint(false)
    setTimeout(() => {
      dispatch(getProject(project.crypt))
    }, 300);
  }
  const finishSprintFunc = () => {
    dispatch(finishSprint(sprint._id))
    setOpenSprint(false)
    setTimeout(() => {
      dispatch(getProject(project.crypt))
    }, 300);
  }
  const checkTaskStatus = (taskId) => {
    dispatch(finishTask(sprint._id, taskId))
    setTimeout(() => {
      dispatch(getSprint(sprint._id))
    }, 300);
  }
  const deleteTaskFunc = (taskId) => {
    dispatch(DeleteTask(sprint._id, taskId))
    setTimeout(() => {
      dispatch(getSprint(sprint._id))
    }, 300);
  }



  const closeSprint = () => {
    setOpenSprint(false)
    dispatch(getProject(project.crypt))
  }

  return (
    
 

        <View style={sprintStyle.container}>
       

          <View>
              <View style={sprintStyle.histTitle} onTouchEnd={()=>setOpenHistory(!openHistory)}>
                <Icon name='playlist-check' color='#7C7C7C' size={24}/>
                <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>История</Text>
                <ArrowIcon name={'keyboard-arrow-down'} color='#7C7C7C' size={24}/>
              </View>
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
