import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { Button, CheckBox, colors, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { EditTask } from '../../redux/actions/projects';


const Project = ({ navigation, historyScreen, task, checkTask, deleteTask, dispatchSprint, cryptProject}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
//   const cryptProject = useSelector(state => state.projects.selectedProject)
  const sprint = useSelector(state => state.projects.sprint)

  const user = useSelector(state => state.auth.user)
  const userSprints = user.sprints.map(el=>el._id)


  const [edit, setEdit] = useState(false)
  const [taskData, setTaskData] = useState(task.taskTitle)

const editTask = () => {
    dispatch(EditTask(taskData, task._id, sprint._id))
    setEdit(false)
  
}

// useEffect(()=>{





  return (
    <View>
         {!edit?<View  style={{flexDirection: 'row', alignItems: 'center'}} >
            <CheckBox
            disabled={historyScreen? true : false}
            checked={task.taskStatus}
            onPress={checkTask}
            />
            <Text style={{marginRight: 'auto'}} onPress={()=>!historyScreen && setEdit(true)}>{task.taskTitle}</Text>
            {!historyScreen && <Icon name='delete-outline' size={24}  onPress={deleteTask}/>}
        </View> :
        <View>
            <TextInput 
                label='Редактировать задачу'
                placeholder='Введите новую текст задачи'
                value={taskData}
                onChangeText={(text)=>setTaskData(text)}
                ref={ref}
            />
            <Button title='Редактировать' onPress={()=>editTask()}/>
            <Button title='Отмена' onPress={()=>setEdit(false)}/>
        </View>
        }
    </View>
       

        )
             
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
