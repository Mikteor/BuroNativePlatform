import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput,  } from 'react-native';
// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button } from 'react-native-elements';
import { SvgUri } from 'react-native-svg';



const Login = ({navigation, deviceToken}) => {

const dispatch = useDispatch()

 
const [formData, setFormData ] = useState({
        
  email: '',
  password: '',
  dev_id: deviceToken


});



const onSubmit = () => {
  dispatch(login(formData))
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
      <SvgUri
    width="100%"
    height="100%"
    uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
  />
     
  

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
