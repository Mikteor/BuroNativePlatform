import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { Button, CheckBox, colors, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../../redux/actions/auth';
import { usersPartition } from '../../../redux/actions/user';
import { loadUser } from '../../../redux/actions/auth';
import { addTask, deleteSprint, getProject, finishSprint, finishTask, DeleteTask, getSprint } from '../../../redux/actions/projects';
import CommonHeader from '../../../components/common/header/commonHeader'
import TaskRow from '../../../components/projects/sprintTaskRow'

const Project = ({ navigation, route}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const cryptProject = useSelector(state => state.projects.selectedProject)
  const { historyScreen } = route.params;

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
  

  const addNewTask = () => {
    // console.log(sprint._id, newTaskData)
    dispatch(addTask(sprint._id, newTaskData))
    setnewTaskData('')
    // setnewTaskFrom(false)
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
    navigation.pop()
    setTimeout(() => {
      dispatch(getProject(cryptProject))
      navigation.pop()
    }, 300);
  }
  const finishSprintFunc = () => {
    dispatch(finishSprint(sprint._id))
    setOpenSprint(false)
    setTimeout(() => {
      dispatch(getProject(cryptProject))
      navigation.pop()
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





  return (
    
 
    
        <View style={style.container}>
            <CommonHeader navigation={navigation}/>
          

              <View style={style.main} >
                <View style={style.modalBtn}>
                  <Text style={style.title} >{sprint&&sprint.title && sprint.title} {sprint &&  sprint.dateOpen.slice(5,10).split('-').reverse().join('.')}</Text>
                </View>
                <View style={style.modalBtn}>
                  <Text style={style.modalBtnText}>{sprint && sprint.description}</Text>
                </View>
                {sprint && sprint.tasks.map((el,i)=>{
                  return(
      
      <TaskRow key={'taskrow'+i} task={el} historyScreen={historyScreen} checkTask={()=>checkTaskStatus(el.id)} deleteTask={()=>deleteTaskFunc(el.id)} dispatchSprint={()=>dispatch(getSprint(sprint._id))} cryptProject={cryptProject} />
                  )
                })}
                {newTaskFrom && 
                <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 30,}}>
                    <Icon name='check-bold' size={24} style={{marginTop: 15}} onPress={()=>addNewTask()}/>
                    <Input 
                        placeholder='Описание задачи'
                        onChangeText={(text)=>setnewTaskData(text)}
                        ref={ref}
                    />
                    <Icon name='cancel' size={24} style={{marginTop: 15}} onPress={()=>cancelNewTask()}/>
                </View>
                }
                {!historyScreen &&<TextInput 
                  label='Новая задача'
                  placeholder='Введите новую задачу'
                  value={newTaskData}
                  onChangeText={(text)=>setnewTaskData(text)}
                  ref={ref}
                />}
                
                {!historyScreen && <Button disabled={newTaskData.length>0? false : true} title='Добавить задачу' onPress={()=>addNewTask()}/>}
                {!historyScreen && <Button title='Завершить спринт' type='clear' onPress={()=>finishSprintFunc()}/>}
                <Button title='Удалить спринт' type='clear' onPress={()=>deleteSprintFunc()}/>
                
            </View>
        







        </View>

  


  );
}
export default Project



  const style =  StyleSheet.create({
   container:{
     flex:1,
     backgroundColor: 'white',
   },
   main: {
     padding: 10,
   },
   title: {
     fontWeight: 'bold',
     fontSize: 24,
   },

  });
