import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { getProject, addSprint } from '../../redux/actions/projects';


const CreateNewSprint = ({navigation, visible, closeModal, project}) => {
  const dispatch = useDispatch()

  const cryptProject = useSelector(state => state.projects.selectedProject)


  const [sprintTitle, setSprintTitle] = useState('')
  const [sprintDescription, setSprintDescription] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')


  const createSprint = () => {
    const sprintTags = [tag1, tag2] 
    dispatch(addSprint(cryptProject, sprintTitle, sprintDescription,  sprintTags))
    setTimeout(() => {
        setSprintDescription(''),
        setSprintTitle(''),
        setTag1('')
        setTag2('')
        closeModal()
    }, 150);
    setTimeout(() => {
      navigation.navigate('openSprint',{project: project})
    }, 300);
  }
const cancel = () => {
  setSprintDescription(''),
  setSprintTitle(''),
  setTag1('')
  setTag2('')
  closeModal()
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
                      sprintDescription.length>0 ?
                      false : true
                    }
                    title='Создать спринт'  
                    onPress={()=>createSprint()}
                />
                <Button title='Отменить' type='clear' onPress={()=>cancel()}/>
                
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
