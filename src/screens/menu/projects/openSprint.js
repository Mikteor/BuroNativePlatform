import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button,} from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../../redux/actions/auth';
import { addTask, deleteSprint, finishSprint,  clearOpenedSprint } from '../../../redux/actions/projects';
import TaskRow from '../../../components/projects/sprintTaskRow'
import Confirm from '../../../components/common/confirm'
import Loadscreen from '../../../components/common/loadingScreen'

const Project = ({ navigation, route}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const tasksScrollview = useRef(null)
  const { historyScreen } = route.params;

  const userSprints = useSelector(state => state.auth.user.sprints)
  const sprint = useSelector(state => state.projects.sprint)
  let chosen = sprint && userSprints? userSprints.some(el=>el._id==sprint._id) : false


  const [newTaskData, setnewTaskData] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [finishConfirm, setFinishConfirm] = useState(false)
  const [newTaskLoader, setNewTaskLoader] = useState(false)

  useEffect(()=>{
    setNewTaskLoader(false)
  },[sprint])

  const chosenSprint = () => {
    dispatch(addToChosen(sprint._id));
  }

  const addNewTask = () => {
    dispatch(addTask(sprint._id, newTaskData))
    setnewTaskData('')
    ref.current.focus()
    setNewTaskLoader(true)
    tasksScrollview.current.scrollTo({x:0, y:100000, animated:true})
    
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

useEffect(()=>{
  return ()=>dispatch(clearOpenedSprint())
},[])

const backButton = () => {
  navigation.pop()
}


if(!sprint){
  return(
    <Loadscreen />
  )
}
  return (
    
    <View style={{flex:1}}>
        <View style={style.container}>
            <View style={style.topRow}>
                <Text onPress={()=>backButton()}>Назад</Text>
                <Icon style={style.iconChosen} name={chosen? 'star':'star-outline'} size={24} color='black' onPress={()=>chosenSprint()}/>
            </View>
            <View style={style.nameBlock}> 
                <Text style={style.title} >{sprint&&sprint.title && sprint.title}</Text>
                <Text style={style.modalBtnText}>{sprint && sprint.description}</Text>
            </View>


            <Text style={style.tasksTitle}>Задачи</Text>


            <ScrollView ref={tasksScrollview} style={style.main} keyboardShouldPersistTaps='always'>

                  {sprint && sprint.tasks.map((el,i)=>{
                    return(
                      
                          <TaskRow 
                              key={'taskrow'+i} 
                              task={el} 
                              historyScreen={historyScreen} 
                              sprint={sprint}
                      
                              />
                    )
                  })}

                  {newTaskLoader && <Loadscreen reverse small /> }

                  {!historyScreen &&
                  <View style={{flexDirection:'row',marginBottom: 150, backgroundColor:'white'}}>
                  
                        <TextInput 
                            underlineColor='white' 
                            style={{backgroundColor:'white', flex:1}}
                            placeholder='Введите новую задачу'
                            value={newTaskData}
                            onChangeText={(text)=>setnewTaskData(text)}
                            ref={ref}
                        />
                        <Icon onPress={()=>newTaskData.length>0 && addNewTask()}  name='check' size={30} color={newTaskData.length>0 ? 'black' : 'grey'} style={{alignSelf: 'center', marginRight: 10,}}/>
                  
                  </View>
                  }
              </ScrollView>
        </View>


            {/* absolute buttons */}
            <View style={{backgroundColor:'white'}}>
                {!historyScreen && <Button containerStyle={{borderRadius:50, marginHorizontal:20,}} title='Завершить спринт'  onPress={()=>setFinishConfirm(true)}/>}
                <Button title='Удалить спринт' type='clear' onPress={()=>setDeleteConfirm(true)}/>
            </View>

            {/* modals */}
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
