import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Alert,  } from 'react-native';
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
 
      <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'flex-end', marginHorizontal:15, marginVertical:10,}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom:2,}}>Логин</Text>
        <Button title='Регистрация' type='clear' titleStyle={{color:'black'}}  onPress={()=>navigation.navigate('registration')} />
      </View>
      <Input
        onChangeText={text=>setFormData({...formData, email: text})}
        value={formData.email}
        placeholder='E-mail'
        style={styles.input}
      />
      <Input
        onChangeText={text=>setFormData({...formData, password: text})}
        value={formData.password}
        placeholder='Пароль' 
        style={styles.input}
        secureTextEntry={true}
      />
      <Button title='Войти' onPress={onSubmit} buttonStyle={{borderRadius: 50, marginHorizontal:15, height:50, backgroundColor:'black'}} />
      <Button title='Забыли пароль?' type='clear' titleStyle={{color:'black'}} onPress={()=>Alert.alert('Вы получали пароль в вашем Rocketchat при регистрации')} />
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
  input:{
    borderWidth:0.5,
    borderRadius:8,
  },

});
