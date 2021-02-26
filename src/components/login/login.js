import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput,  } from 'react-native';
// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button } from 'react-native-elements';



const Login = ({navigation}) => {

const dispatch = useDispatch()


 
const [formData, setFormData ] = useState({
        
  email: '',
  password: ''


});



const onSubmit = async e => {
  e.preventDefault();
  // console.log(formData)
  dispatch(login(formData))

      // register({ name, email, password});

     
  }

 

  return (
    
    <View style={styles.container}>
 

      <Input
        onChangeText={text=>setFormData({...formData, email: text})}
        value={formData.email}
        placeholder='e-mail'
      />
      <Input
        onChangeText={text=>setFormData({...formData, password: text})}
        value={formData.password}
        placeholder='password' 
      />
      <Button title='Подтвердить' onPress={onSubmit} />
      <Button title='Регистрация' type='clear'  onPress={()=>navigation.navigate('registration')} />
      {/* <Button title='log' onPress={log} /> */}
     
  

    </View>
  );
}
export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

});
