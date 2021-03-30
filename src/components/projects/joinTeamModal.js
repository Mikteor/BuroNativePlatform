import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'
import { StackRouter } from '@react-navigation/routers';


const JoinTeamModal = ({visible, closeModal, confirm, reject, role, changeRole, task, changeTask}) => {



  return (
    

          <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={closeModal} 
          >
              <View style={styles.modalCont} >
                <View style={styles.modalCard} >
                    <Text style={styles.modalTitle}>Вступить в команду?</Text>

                    <TextInput 
                        placeholder='Роль на проекте..'
                        underlineColor='transparent'
                        value={role}
                        onChangeText={(text)=>changeRole(text)}
                        style={styles.input}
                        
                    />
                     <TextInput 
                        placeholder='Задача на проекте..'
                        underlineColor='transparent'
                        value={task}
                        onChangeText={(text)=>changeTask(text)}
                        style={styles.input}
                    />
                    
                    <Button 
                        title='Вступить'  
                        onPress={confirm}
                        containerStyle={{borderRadius: 100,}}
                        buttonStyle={{backgroundColor: 'black', height:50}}
                    />
                    <Button 
                        title='Отмена' 
                        type='clear' 
                        onPress={reject}
                        titleStyle={{color: 'black'}} />
                    
                </View>
            </View>
          </Modal>





  


  );
}
export default JoinTeamModal



  const styles =  StyleSheet.create({

  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalCard: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    borderRadius: 15,
    padding: 10,
    paddingBottom: 40,
    elevation: 15,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    // borderRadius: 108,
    marginBottom: 25,
  },
  });
