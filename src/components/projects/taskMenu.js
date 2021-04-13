import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';



const CreateNewSprint = ({visible, closeModal, changePress,performerPress,deadlinePress,deletePress,modalTop}) => {



  return (

    <Modal 
    visible={visible}
    animationType="fade"
    transparent={true}
    
  >
    <View style={{flex:1, backgroundColor: 'transparent'}} onTouchEnd={closeModal}>
          <View style={{backgroundColor:'white', position: 'absolute', top:modalTop-7, right: 40, padding:10, elevation:3, borderRadius:7,}}>
            <View style={style.onpressView} onTouchEnd={changePress}>
                <Icon style={style.icon} name='pencil' size={20} color='black'/>
                <Text>Изменить</Text>
            </View>
            <View style={style.onpressView} onTouchEnd={performerPress}>
                <Icon style={style.icon} name='account-check-outline' size={20} color='black'/>
                <Text>Исполнитель</Text>
            </View>
            <View style={style.onpressView} onTouchEnd={deadlinePress}>
                <Icon style={style.icon} name='alarm' size={20} color='black'/>
                <Text>Дедлайн</Text>
            </View>
            <View style={style.onpressView} onTouchEnd={deletePress}>
                <Icon style={style.icon} name='trash-can-outline' size={20} color='black'/>
                <Text>Удалить</Text>
            </View>
         
          </View>
    </View>
  </Modal>

  );
}
export default CreateNewSprint



  const style =  StyleSheet.create({
  

    onpressView: {
      backgroundColor:'white',
      paddingVertical: 5,
      flexDirection:'row',
    },
    icon: {
      marginRight: 5,
    },
  });
