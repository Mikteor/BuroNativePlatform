import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image,  ImageBackground, StatusBar, Modal, } from 'react-native';
import {Picker} from '@react-native-community/picker'

import { DataTable, FAB, TextInput } from 'react-native-paper';
import { Button, CheckBox, Input } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux';
import { addToChosen } from '../../redux/actions/auth';
import { usersPartition } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';
import { addTask, deleteSprint, getProject, finishSprint, finishTask, DeleteTask, getSprint, addSprint } from '../../redux/actions/projects';


const CreateNewSprint = ({navigation, visible, closeModal}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const refTag = useRef(null)

  const project = useSelector(state => state.projects.project)
  const cryptProject = useSelector(state => state.projects.selectedProject)

  const user = useSelector(state => state.auth.user)
  const userSprints = user.sprints.map(el=>el._id)
  const sprint = useSelector(state => state.projects.sprint)


  const [newTaskFrom, setnewTaskFrom] = useState(false)
  const [newTaskData, setnewTaskData] = useState('')
  const [newTagFrom, setnewTagFrom] = useState(false)
  const [newTagData, setnewTagData] = useState('')
  const [sprintLength, setSprintLength] = useState(1)




  const [sprintTitle, setSprintTitle] = useState('')
  const [sprintDescription, setSprintDescription] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')
  const [sprintDate, setSprintDate] = useState(null)


useEffect(()=>{
  const now = Date.now()
  const then = now + 604800000 * sprintLength
  const deadLineDate = new Date(then)
  setSprintDate(deadLineDate)

},[sprintLength])
  

  // const addNewTask = () => {
  //   // console.log(sprintTasks, newTaskData)
  //   setSprintTasks([...sprintTasks, newTaskData])
  //   ref.current.clear()
  //   setnewTaskFrom(false)

  // }
  // const cancelNewTask = () => {
  //   setnewTaskFrom(false)
  //   ref.current.clear()
  // }
  // const addNewTag = () => {
  //   // console.log(sprintTags, newTagData)
  //   sprintTags.length>1 && setnewTagFrom(false)
  //   setSprintTags([...sprintTags, newTagData])
  //   refTag.current.clear()
  //   setnewTagFrom(false)

  // }
  // const cancelNewTag = () => {
  //   setnewTagFrom(false)
  //   refTag.current.clear()
  // }


  // const deleteTaskFunc = (i) => {
    
  //   let tasks = sprintTasks
  //   tasks.splice(i, 1)
  //   // console.log(tasks)
  //   setSprintTasks(tasks)
  // }
  // const deleteTagFunc = (i) => {
    
  //   let tags = sprintTags
  //   tags.splice(i, 1)
  //   // console.log(tags)
  //   setSprintTags(tags)
  // }

  const createSprint = () => {
    const sprintTags = [tag1, tag2] 
    dispatch(addSprint(cryptProject, sprintTitle, sprintDescription, sprintDate, sprintTags))
    setTimeout(() => {
    dispatch(getProject(cryptProject))
    closeModal()
      
    }, 300);
  }


  return (
    

          <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={closeModal} 
          >
              <View style={sprintStyle.modalCont} >

              <View style={sprintStyle.modalCard} >
                <View style={sprintStyle.modalBtn}>
                  <Text style={sprintStyle.modalBtnText} >Создание нового спринта</Text>
                </View>

                <TextInput 
                        label='Название спринта'
                        placeholder='Название спринта'
                        value={sprintTitle}
                        onChangeText={(text)=>setSprintTitle(text)}
                    />
                <TextInput 
                        label='Описание спринта'
                        placeholder='Описание спринта'
                        value={sprintDescription}
                        onChangeText={(text)=>setSprintDescription(text)}
                    />

                <Picker
                    selectedValue={sprintLength}
                    onValueChange={(itemValue, itemIndex) => setSprintLength(itemValue)}
                    >          
                      <Picker.Item label={'1 неделя'} value={1} />
                      <Picker.Item label={'2 недели'} value={2} />
                </Picker>
                
                <TextInput 
                        label='Тэг 1'
                        placeholder='Тэг 1'
                        value={tag1}
                        onChangeText={(text)=>setTag1(text)}
                    />
                <TextInput 
                        label='Тэг 2'
                        placeholder='Тэг 2'
                        value={tag2}
                        onChangeText={(text)=>setTag2(text)}
                    />
               
                <Button 
                    disabled={
                      sprintDescription.length>0 &&
                      sprintDate?
                      false : true
                    }
                    title='Создать спринт'  
                    onPress={()=>createSprint()}
                />
                <Button title='Отменить' type='clear' onPress={closeModal}/>
                
            </View>
            </View>
          </Modal>





  


  );
}
export default CreateNewSprint



  const sprintStyle =  StyleSheet.create({
   container:{
    //  backgroundColor: 'red',
     flex:1
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
