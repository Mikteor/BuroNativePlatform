import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { register } from '../../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';



const Registration = () => {

const dispatch = useDispatch()

// const tokBoulean = useSelector(state=> state.auth.token)
// const swit = token? true : false
 
const [formData, setFormData ] = useState({
        
  email: '',
  rocketname: '',

});






const log = () => {
  console.log('bbb')

 
//   // console.log( AsyncStorage, 'NEW TOKEN ')
//  console.log(tok, 'getItem token')
// token.then(res => setToken(res))
// console.log(tokken, 'tokkkkkken')
}

// const registerUser =  new Promise((resolve, reject)=>{
//         dispatch(register(formData))
//         resolve
//     })

const onSubmit = e => {
  e.preventDefault();
  // console.log(formData)
  console.log('page form data', formData)
  dispatch(register(formData))

      // register({ name, email, password});

     
  }

 

  return (
    
    <View style={styles.container}>
        {/* <Input
            onChangeText={text=>setFormData({...formData, name: text})}
            value={formData.name}
            placeholder='Name'
        />
        <Input
            onChangeText={text=>setFormData({...formData, lastname: text})}
            value={formData.lastname}
            placeholder='Lastname'
        /> */}
        <Input
            onChangeText={text=>setFormData({...formData, email: text})}
            value={formData.email}
            placeholder='E-mail'
        />
        <Input
            onChangeText={text=>setFormData({...formData, rocketname: text})}
            value={formData.rocketname}
            placeholder='Rocket name'
        />


     
      <Button title='Подтвердить' onPress={onSubmit} />
      {/* <Button title='log' onPress={log} /> */}
     
  

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

});
