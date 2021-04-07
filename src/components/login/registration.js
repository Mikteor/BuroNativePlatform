import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/auth'
import { StyleSheet, View, Button } from 'react-native';
import { Input } from 'react-native-elements';
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
        />
        <Input
            onChangeText={text=>setFormData({...formData, rocketname: text})}
            value={formData.rocketname}
            placeholder='Rocket name'
        />
      <Button title='Подтвердить' onPress={onSubmit} />

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
