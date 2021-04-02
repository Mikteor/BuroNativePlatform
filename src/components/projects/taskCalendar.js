import React from 'react';
import { StyleSheet, Text, View,  Modal, } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const JoinTeamModal = ({visible, closeModal, dayPress, deadline}) => {

const marked = Object.fromEntries([[deadline, {selected: true, marked: true, selectedColor: 'black'}]])

  return (
    

          <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={closeModal} 
          >
              <View style={styles.modalCont}>
                  <View style={styles.modalCard}>
                        <Calendar 
                            onDayPress={(day)=>dayPress(day)} 
                            minDate={Date()}  
                            markedDates={ marked }
                            />
                  </View>
                 
            </View>
          </Modal>





  


  );
}
export default JoinTeamModal



  const styles =  StyleSheet.create({

  modalCont: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 10,
    elevation: 15,
    marginTop: 30,
  },
 
  });
