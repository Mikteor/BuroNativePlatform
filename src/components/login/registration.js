import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/auth'
import { StyleSheet, View,  } from 'react-native';
import { Input, Button } from 'react-native-elements';
import CommonHeader from '../common/header/commonHeader'



const Registration = ({navigation, deviceToken}) => {

const dispatch = useDispatch()

 
const [formData, setFormData ] = useState({
        
  email: '',
  rocketname: '',
  dev_id: deviceToken

});



const onSubmit = e => {
  e.preventDefault();

  dispatch(register(formData))

  }

 

  return (
    
    <View style={styles.container}>
      <View style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
        <CommonHeader navigation={navigation} title='Регистрация'/>
      </View>
  
        <Input
            onChangeText={text=>setFormData({...formData, email: text})}
            value={formData.email}
            placeholder='E-mail'
            style={styles.input}
        />
        <Input
            onChangeText={text=>setFormData({...formData, rocketname: text})}
            value={formData.rocketname}
            placeholder='Rocket name'
            style={styles.input}
        />
      <Button title='Подтвердить' onPress={onSubmit} buttonStyle={{borderRadius: 50, marginHorizontal:15, height:50, backgroundColor:'black'}} />

    </View>
  );
}
export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth:0.5,
    borderRadius:8,
  },

});
