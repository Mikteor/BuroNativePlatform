import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, ScrollView, Image} from 'react-native';
import {  TextInput, } from 'react-native-paper';
import { Button, ListItem } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { getProject, addSprint, addUserToTask } from '../../redux/actions/projects';
import TouchableScale from 'react-native-touchable-scale';
import {url} from '../../components/utils/axios'


const CreateNewSprint = ({navigation, visible, closeModal, taskId}) => {
  const dispatch = useDispatch()

const project = useSelector(state => state.projects.project)
const sprint = useSelector(state => state.projects.sprint)


const addPerformer = (userId) => {
    dispatch(addUserToTask(sprint._id, userId, taskId  ))
    // console.log(sprint._id, userId, taskId )
}


  return (
    

          <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={closeModal} 
          >
            <View style={styles.modalCont} onTouchEnd={closeModal} >
                <ScrollView style={styles.modalCard} >
                    {project.team2.map((el,i)=>{
                        return(
                            <ListItem
                                style={{marginVertical: 2,}}
                                key={'teamBuro'+i}  
                                // containerStyle={styles.buttContainer}
                                Component={TouchableScale}
                                friction={90} //
                                tension={100} // These props are passed to the parent component (here TouchableScale)
                                activeScale={0.95} //
                                onPress={()=>addPerformer(el.user._id)}
                                >
                                    <Image source={el.user.avatar? {uri: `${url+el.user.avatar}`} : require('../../../assets/ava.jpeg')} style={styles.avatar}/>
                                    <ListItem.Content>
                                    <ListItem.Title>{el.user.fullname}</ListItem.Title>
                                    <ListItem.Subtitle>{el.user.position}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                            </ListItem>
                        )
                    })}
                </ScrollView>
            </View>
          </Modal>





  


  );
}
export default CreateNewSprint



  const styles =  StyleSheet.create({
  

  modalCont: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalCard: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 20,
  },
  });
