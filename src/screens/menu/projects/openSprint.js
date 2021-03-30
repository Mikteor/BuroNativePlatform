import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, StatusBar, Modal } from 'react-native';
import { DataTable, FAB, Portal, Provider, TextInput } from 'react-native-paper';
import { Button, CheckBox, colors, Input, Tooltip } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../../redux/actions/auth';
import { usersPartition } from '../../../redux/actions/user';
import { loadUser } from '../../../redux/actions/auth';
import { addTask, deleteSprint, getProject, finishSprint, finishTask, DeleteTask, getSprint } from '../../../redux/actions/projects';
import CommonHeader from '../../../components/common/header/commonHeader'
import TaskRow from '../../../components/projects/sprintTaskRow'
import Confirm from '../../../components/common/confirm'

const Project = ({ navigation, route}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const { historyScreen } = route.params;

  const user = useSelector(state => state.auth.user)
  const sprint = useSelector(state => state.projects.sprint)
  let chosen = sprint && user.sprints? user.sprints.some(el=>el._id==sprint._id) : false


  const [newTaskData, setnewTaskData] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [finishConfirm, setFinishConfirm] = useState(false)

const chosenSprint = () => {
  dispatch(addToChosen(sprint._id));
  // dispatch(loadUser())
}

  const addNewTask = () => {
    dispatch(addTask(sprint._id, newTaskData))
    setnewTaskData('')
    ref.current.focus()
    
  }
  const deleteSprintFunc = () => {
    dispatch(deleteSprint(sprint._id))
    setTimeout(() => {
      navigation.pop()
    }, 100);
  }
  const finishSprintFunc = () => {
    dispatch(finishSprint(sprint._id))
    setTimeout(() => {
      navigation.pop()
    }, 100);
  }
  const checkTaskStatus = (taskId) => {
    dispatch(finishTask(sprint._id, taskId))
  }
  const deleteTaskFunc = (taskId) => {
    dispatch(DeleteTask(sprint._id, taskId))
  }





  return (
    
 
    <View style={{flex:1}}>
        <View style={style.container}>
          
                <View style={style.topRow}>
                    <Text onPress={()=>navigation.pop()}>Назад</Text>
                    <Icon style={style.iconChosen} name={chosen? 'star':'star-outline'} size={24} color='black' onPress={()=>chosenSprint()}/>
                </View>
                <View style={style.nameBlock}> 
                    <Text style={style.title} >{sprint&&sprint.title && sprint.title}</Text>
                    <Text style={style.modalBtnText}>{sprint && sprint.description}</Text>
                </View>


              <Text style={style.tasksTitle}>Задачи</Text>
              <ScrollView style={style.main} >
                

                {sprint && sprint.tasks.map((el,i)=>{
                  return(
                    
                        <TaskRow 
                            key={'taskrow'+i} 
                            task={el} 
                            historyScreen={historyScreen} 
                            checkTask={()=>checkTaskStatus(el._id)} 
                            deleteTask={()=>deleteTaskFunc(el._id)} 
                            />
                  )
                })}
                
                {!historyScreen &&
                <View style={{flexDirection:'row',marginBottom: 100, }}>
                  <View style={{ width:'85%', borderBottomWidth:0,}}>
                      <TextInput 
                          underlineColor='white' 
                          style={{backgroundColor:'white'}}
                          placeholder='Введите новую задачу'
                          value={newTaskData}
                          onChangeText={(text)=>setnewTaskData(text)}
                          ref={ref}
                      />
                  </View>
                  <View style={{marginRight:0, width:'15%', justifyContent:'center', alignItems:'center', backgroundColor:'white'}} onTouchEnd={()=>newTaskData.length>0 && addNewTask()} >
                      <Icon name='check' size={30} color={newTaskData.length>0 ? 'black' : 'grey'}/>
                  </View>
                
                    
                </View>
                }
                
                
                
            </ScrollView>
        







        </View>

            <View style={{backgroundColor:'white'}}>
                {!historyScreen && <Button containerStyle={{borderRadius:50, marginHorizontal:20,}} title='Завершить спринт'  onPress={()=>setFinishConfirm(true)}/>}
                <Button title='Удалить спринт' type='clear' onPress={()=>setDeleteConfirm(true)}/>
            </View>


            <Confirm 
                visible={finishConfirm} 
                closeModal={()=>setFinishConfirm(false)} 
                title={'Вы уверены, что хотите завершить спринт "'+ (sprint && sprint.title)+'"?'} 
                subtitle=''
                confirm={()=>finishSprintFunc()}
                reject={()=>setFinishConfirm(false)}
                finish
                />
            <Confirm 
                visible={deleteConfirm} 
                closeModal={()=>setDeleteConfirm(false)} 
                title={'Вы уверены, что хотите удалить спринт "'+ (sprint && sprint.title)+'"?'} 
                subtitle='Вы не сможете восстановить его.'
                confirm={()=>deleteSprintFunc()}
                reject={()=>setDeleteConfirm(false)}
                delet
                />
            

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
   topRow: {
     marginTop: 20,
     marginHorizontal: 15,
     marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
   },
   nameBlock: {
    alignItems: 'center',
    backgroundColor: 'white',


   },
   title: {
     fontWeight: 'bold',
     fontSize: 24,
   },
   tasksTitle: {
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal:15,
   },
  });
