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
    navigation.navigate('openSprint',{project: project})
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
          <View style={sprintStyle.sprints}>
          <View style={{backgroundColor:'black', height:20,}}/>
            <ScrollView style={{marginTop:-20,}}>
          


      {project.sprints
      .filter(el => !el.status)
      .map((el,i)=>{

        let finishedTasks = 0
            el.tasks.map((task,i)=>{
              task.taskStatus==true && (finishedTasks += 1)
            })
        let percent = finishedTasks/el.tasks.length*100
        let chosen = userSprints.some(id=>id==el._id)

        const now = new Date()
        const finish = new Date(el.dateClosePlan)

        return(
            <View key={'sprints'+i} style={sprintStyle.card}>
              <View style={sprintStyle.topFlex}>
                <Text style={sprintStyle.title}>Спринт {el.dateOpen.slice(5,10).split('-').reverse().join('.')}</Text>
                <Icon name='circle' color={now<finish? 'green' : now>finish && percent<100?'red': 'green'} size={14} style={sprintStyle.statusDot}/>
                <Icon name='pencil-outline' color='black' size={16} style={{marginLeft: 5,}} onPress={()=>editSprint(el._id)}/>
                <Text style={sprintStyle.status}>{Math.round(percent)}%</Text>
              </View>
              <Text style={sprintStyle.description}>{el.description}</Text>
              <View style={sprintStyle.botFlex}>
                <View style={sprintStyle.type}>
                  <Text style={{color: '#CA9E4D',}}>{project.stage}</Text>
                </View>
                <Icon name={chosen? 'star':'star-outline'} size={24} color='black' onPress={()=>chosenSprint(el._id)}/>
              </View>
            </View>
        )
      })}
          </ScrollView>
          </View>




        
        {/* <Portal> */}
            <FAB
              style={sprintStyle.fab}
              color='white'
              icon="plus"
              onPress={() => navigation.navigate('createSprint')}
            />
        {/* </Portal> */}
        


      





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
  fab: {
    position: 'absolute',
    margin: 16,
    // marginBottom: 65,
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
