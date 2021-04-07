import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet,  View, Button , Text, } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonHeader from '../../components/common/header/commonHeader'

import { likedProposes, newPropose } from '../../redux/actions/office';

const NewPropose = ({navigation}) => {
const dispatch = useDispatch()
const ref = useRef(null)
const ref1 = useRef(null)


const [formData, setFormData ] = useState({
  title: '',
  text: '',
});


const onSubmit = e => {
  e.preventDefault();

  dispatch(newPropose(formData))
  ref.current.clear()
  ref1.current.clear()

  setTimeout(() => {
    navigation.navigate('Офис')
  }, 100);
  }


  return (
    <View style={styles.container}>
      <CommonHeader title={'Создать предложение'} navigation={navigation} />

      <View style={styles.title}>
          <Icon name='account-group-outline' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Новое предложение</Text>
      </View>

      <Input
        ref={ref}
        placeholder='Заголовок'
        onChangeText={(text)=>setFormData({...formData, title: text})}
        // leftIcon={<Icon name="account" size={24} color="black" />}
        />
      <Input
        ref={ref1}
        placeholder='Текст'
        onChangeText={(text)=>setFormData({...formData, text: text})}
        // leftIcon={<Icon name="account" size={24} color="black" />}
        />
 
      <Button title="Подтвердить" onPress={onSubmit}/>
 
 
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 5,
    paddingBottom: 3,
    marginTop: 20,
  },
  

});



export default NewPropose
