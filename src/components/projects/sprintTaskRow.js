import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { Button, CheckBox, colors, Input, Tooltip } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { EditTask } from '../../redux/actions/projects';
import Performer from './performer'
import {url} from '../../components/utils/axios'


const Project = ({ navigation, historyScreen, task, checkTask, deleteTask,  }) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const reff = useRef(null)
//   const cryptProject = useSelector(state => state.projects.selectedProject)
  const sprint = useSelector(state => state.projects.sprint)
  const user = useSelector(state => state.auth.user)


  const [edit, setEdit] = useState(false)
  const [performerModal, setPerformerModal] = useState(false)
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





  return (

    <View style={style.rowCont}>
         {!edit?
         <View  style={{flexDirection: 'row', alignItems: 'center', }} >
            <CheckBox
            disabled={historyScreen? true : false}
            checked={task.taskStatus}
            onPress={checkTask}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width:'80%', backgroundColor:'white'}}  onTouchEnd={(e)=>modalOpen(e)}>
                <Text ref={reff}>{task.taskTitle}</Text>
                {task.user && <Image source={task.user.avatar? {uri: `${url+task.user.avatar}`} : require('../../../assets/ava.jpeg')} style={style.avatar}/>}
            </View>
            

            {!historyScreen && <Modal 
              visible={modal}
              animationType="fade"
              transparent={true}
              
            >
              <View style={{flex:1, backgroundColor: 'transparent'}} onTouchEnd={()=>{setModal(false)}}>
                    <View style={{backgroundColor:'white', position: 'absolute', top:modalTop-7, right: 40, padding:10, elevation:3, borderRadius:7,}}>
                      <View style={style.onpressView} onTouchEnd={()=>setEdit(true)}>
                          <Icon style={style.icon} name='pencil' size={20} color='black'/>
                          <Text>Изменить</Text>
                      </View>
                      <View style={style.onpressView} onTouchEnd={()=>setPerformerModal(true)}>
                          <Icon style={style.icon} name='account-check-outline' size={20} color='black'/>
                          <Text>Исполнитель</Text>
                      </View>
                      <View style={style.onpressView} onTouchEnd={()=>setEdit(true)}>
                          <Icon style={style.icon} name='alarm' size={20} color='black'/>
                          <Text>Дедлайн</Text>
                      </View>
                      <View style={style.onpressView} onTouchEnd={deleteTask}>
                          <Icon style={style.icon} name='trash-can-outline' size={20} color='black'/>
                          <Text>Удалить</Text>
                      </View>
                   
                    </View>
              </View>
            </Modal>}

            <Performer visible={performerModal} closeModal={()=>setPerformerModal(false)} taskId={task._id}/>

        </View> :
        <View style={{flexDirection:'row', }}>
          <View style={{ width:'85%', borderBottomWidth:0}}>
              <TextInput 
                    underlineColor='white' 
                    style={{backgroundColor:'white',}}
                    label='Редактировать задачу'
                    placeholder='Введите новую текст задачи'
                    value={taskData}
                    onChangeText={(text)=>setTaskData(text)}
                    ref={ref}
                />
          </View>
          <View style={{marginRight:0, width:'15%', justifyContent:'center', alignItems:'center', backgroundColor:'white'}} onTouchEnd={()=>editTask()} >
              <Icon name='check' size={30} color='black'/>
          </View>

            
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
    onpressView: {
      backgroundColor:'white',
      paddingVertical: 5,
      flexDirection:'row',
    },
    icon: {
      marginRight: 5,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginRight: 10,
    },
  });
