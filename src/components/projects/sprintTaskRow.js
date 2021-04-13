import React, { useEffect,  useState } from 'react';
import { StyleSheet, Text, View,  Image, } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { CheckBox,  } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { DeleteTask, EditTask, finishTask } from '../../redux/actions/projects';
import Performer from './performer'
import TaskMenu from './taskMenu'
import TaskCalendar from './taskCalendar'
import {url} from '../../components/utils/axios'

const Project = ({ navigation, historyScreen, task, sprint }) => {
  const dispatch = useDispatch()

  // editing task
  const [edit, setEdit] = useState(false)
  const [taskData, setTaskData] = useState(task.taskTitle)

  // modals
  const [performerModal, setPerformerModal] = useState(false)
  const [calendarModal, setCalendarModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalTop, setModalTop] = useState(0) 
  const [deadline, setDeadline] = useState(false)

  // checkbox state
  const [checked, setChecked] = useState(task.taskStatus)


const editTask = () => {
    const ded = task.deadline && task.deadline.slice(0,10)
    dispatch(EditTask(taskData, task._id, sprint._id, ded))
    setEdit(false)
}

const modalOpen = (e) => {
    setModal(true)
    setModalTop(e.nativeEvent.pageY) 
}

const dayPress = (day) => {
    dispatch(EditTask(taskData, task._id, sprint._id, day.dateString))
    setCalendarModal(false)
}


const checkTaskStatus = (taskId) => {
    setChecked(!checked)
    dispatch(finishTask(sprint._id, taskId))
}
const deleteTaskFunc = (taskId) => {
    dispatch(DeleteTask(sprint._id, taskId))
}


useEffect(()=>{
  const date = new Date(task.deadline)
  const dateNaN = isNaN(date)
  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря',]
  const day = date.getDate()
  const month = months[date.getMonth()]
  
  const ded = day + ' ' + month
  !dateNaN && task.deadline!='2011-11-11T00:00:00.000Z' && setDeadline(ded)
},[sprint])

  return (

    <View style={style.rowCont}>
         {!edit?
            <View  style={{flexDirection: 'row', alignItems: 'center', }} >
                <CheckBox
                disabled={historyScreen? true : false}
                checked={checked}
                onPress={()=>checkTaskStatus(task._id)}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', flex:1, backgroundColor:'white'}}  onTouchEnd={(e)=>modalOpen(e)}>
                    <Text style={{marginRight: 'auto'}}>{task.taskTitle}</Text>
                    <Text style={{marginRight: 15,}}>{deadline}</Text>
                    {task.user && <Image source={task.user.avatar? {uri: `${url+task.user.avatar}`} : require('../../../assets/ava.jpeg')} style={style.avatar}/>}
                </View>
            </View> :
            <View style={{flexDirection:'row', }}>
                  <TextInput 
                        underlineColor='white' 
                        style={{backgroundColor:'white', flex:1, borderBottomWidth:0,  }}
                        label='Редактировать задачу'
                        placeholder='Введите новую текст задачи'
                        value={taskData}
                        onChangeText={(text)=>setTaskData(text)}
                    />
                  <Icon name='check' size={30} color='black' onPress={()=>editTask()} style={{alignSelf: 'center', marginRight: 10,}}/>
            </View>
          }

                {!historyScreen && 
                <TaskMenu 
                      visible={modal} 
                      modalTop={modalTop}
                      closeModal={()=>setModal(false)} 
                      changePress={()=>setEdit(true)} 
                      performerPress={()=>setPerformerModal(true)} 
                      deadlinePress={()=>setCalendarModal(true)} 
                      deletePress={()=>deleteTaskFunc(task._id)} 
                      />}

                <Performer 
                      visible={performerModal} 
                      closeModal={()=>setPerformerModal(false)} 
                      taskId={task._id}
                      />
                <TaskCalendar 
                      visible={calendarModal} 
                      closeModal={()=>setCalendarModal(false)} 
                      dayPress={(day)=>dayPress(day)} 
                      deadline={task.deadline && task.deadline.slice(0,10)}
                      />
    </View>
    

        )
             
}
export default Project



  const style =  StyleSheet.create({
    rowCont: {
      borderBottomWidth: 0.5,

    },
   
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginRight: 10,
    },
  });
