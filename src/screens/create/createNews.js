import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet,  View, Button , Text, } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { allNews, createNews } from '../../redux/actions/news';

const CreateNews = ({navigation}) => {
const dispatch = useDispatch()
const ref = useRef(null)
const ref1 = useRef(null)
const ref2 = useRef(null)

const [formData, setFormData ] = useState({
  title: '',
  subtitle: '',
  text: '',
});


const onSubmit = e => {
  e.preventDefault();

  dispatch(createNews(formData))
  ref.current.clear()
  ref1.current.clear()
  ref2.current.clear()

  setTimeout(() => {
    navigation.navigate('Главная')
  }, 100);
  }


  return (
    <View style={styles.container}>

      <View style={styles.title}>
          <Icon name='account-group-outline' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Создать новость</Text>
      </View>

      <Input 
        ref={ref}
        placeholder='Заголовок'
        onChangeText={(text)=>setFormData({...formData, title: text})}
        // leftIcon={<Icon name="account" size={24} color="black" />}
        />
        <Input
        ref={ref1}
        placeholder='Подзаголовок'
        onChangeText={(text)=>setFormData({...formData, subtitle: text})}
        
        // leftIcon={<Icon name="account" size={24} color="black" />}
        />
      <Input
        ref={ref2}
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    
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



export default CreateNews
