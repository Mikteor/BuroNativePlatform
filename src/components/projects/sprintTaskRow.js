import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { Button, CheckBox, colors, Input, Tooltip } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { EditTask } from '../../redux/actions/projects';


const Project = ({ navigation, historyScreen, task, checkTask, deleteTask, dispatchSprint, cryptProject}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const reff = useRef(null)
//   const cryptProject = useSelector(state => state.projects.selectedProject)
  const sprint = useSelector(state => state.projects.sprint)

  const user = useSelector(state => state.auth.user)
  const userSprints = user.sprints.map(el=>el._id)


  const [edit, setEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalTop, setModalTop] = useState(0)
  const [taskData, setTaskData] = useState(task.taskTitle)

const editTask = () => {
    dispatch(EditTask(taskData, task._id, sprint._id))
    setEdit(false)
  
}
const modalOpen = (e) => {
  setModal(true)
  setModalTop(e.nativeEvent.pageY) 
}
// useEffect(()=>{
const cancel = () => {
  setEdit(false)
  setTaskData(task.taskTitle)
}




  return (

    <View style={style.rowCont}>
         {!edit?<View  style={{flexDirection: 'row', alignItems: 'center'}} >
            <CheckBox
            disabled={historyScreen? true : false}
            checked={task.taskStatus}
            onPress={checkTask}
            />

            <Text ref={reff} style={{marginRight: 'auto'}} onPress={(e)=>modalOpen(e)} /*onPress={()=>!historyScreen && setEdit(true)}*/>{task.taskTitle}</Text>
            {/* {!historyScreen && <Icon name='delete-outline' size={24}  onPress={deleteTask}/>} */}


            <Modal 
              visible={modal}
              animationType="fade"
              transparent={true}
              
            >
              <View style={{flex:1, backgroundColor: 'transparent'}} onTouchEnd={()=>{setModal(false)}}>
                    <View style={{backgroundColor:'white', position: 'absolute', top:modalTop-7, left: 140, padding:10, elevation:3, borderRadius:7,}}>
                      <Text><Icon name='pencil' size={20} color='black'/>Изменить</Text>
                      <Text><Icon name='account-check-outline' size={20} color='black'/>Исполнитель</Text>
                      <Text><Icon name='alarm' size={20} color='black'/>Дедлайн</Text>
                      <Text><Icon name='trash-can-outline' size={20} color='black'/>Удалить</Text>
                   
                    </View>
              </View>
            </Modal>


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
            <Button title='Отмена' onPress={()=>cancel()}/>
        </View>
        }
    </View>
    

        )
             
}
export default Project



  const style =  StyleSheet.create({
    rowCont: {
      borderBottomWidth: 0.5,

    },
    modal: {
      backgroundColor: 'red'
    },
  });
