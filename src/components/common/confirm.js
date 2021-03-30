import React, { useState } from 'react';
import { StyleSheet, Text, View,  Modal, } from 'react-native';
import {  TextInput } from 'react-native-paper';
import { Button,  } from 'react-native-elements'


const Confirm = ({visible, closeModal, confirm, reject, title, subtitle, delet, finish}) => {


  return (
    

          <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={closeModal} 
          >
              <View style={styles.modalCont} >
                <View style={styles.modalCard} >
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalSubtitle}>{subtitle}</Text>

                    
                    <Button 
                        title={delet? 'Удалить' : finish && 'Завершить'}  
                        onPress={confirm}
                        containerStyle={{borderRadius: 100,}}
                        buttonStyle={{backgroundColor: 'black', height:50}}
                    />
                    <Button 
                        title='Нет' 
                        type='clear' 
                        onPress={reject}
                        titleStyle={{color: 'black'}} />
                    
                </View>
            </View>
          </Modal>





  


  );
}
export default Confirm



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
    marginVertical: 15,
  },
  modalSubtitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  });
