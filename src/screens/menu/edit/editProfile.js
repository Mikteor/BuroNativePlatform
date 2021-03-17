import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet,  View, Button , Text, } from 'react-native';
import { TextInput } from 'react-native-paper'
import {Picker} from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, Divider } from 'react-native-elements'

// import {  } from '../../redux/actions/auth';
import {allUsers} from '../../../redux/actions/user'
import {loadUser} from '../../../redux/actions/auth'

import {changeData, changeAvatar} from '../../../redux/actions/auth'
import { allDepartments, joinDepartment, findDepartment } from "../../../redux/actions/department";
import EditRow from '../../../components/edit/editProfileRow'
import CommonHeader from '../../../components/header/commonHeader'


const Profile = ({navigation,initial}) => {
const dispatch = useDispatch()

const profile = useSelector(state => state.auth.user)
const departments = useSelector(state => state.departments.departments)
console.log('initial:' ,initial)
const [formData, setFormData ] = useState({
  name: '',
  lastname: '',
  position: '',
  division:  '',  
  email:  '', 
  report:  '',

});

useEffect(()=>{
  profile && setFormData({
    name: profile.name || null,
    lastname: profile.lastname || null,
    position: profile.position || null,
		division: profile.division? profile.division.divname : null,  
    email: profile.email  || null,
		report: profile.report  || null, 
  })
},[profile])

useEffect(()=>{
  dispatch(allDepartments())
},[])

const onSubmit = e => {
  e.preventDefault();
  // console.log(formData, 'formDataEdit')

  dispatch(joinDepartment(formData.division))
  dispatch(changeData(formData))
  setTimeout(() => {
  dispatch(loadUser())
  profile && profile.division && dispatch(findDepartment(profile.division.divname))
    console.log('ololo',formData)
  !initial && navigation.pop()
  }, 300);
  }
useEffect(()=>{
  console.log('lol',formData.division)
},[formData])
  return (

    <View style={{flex:1,}}>
        {!initial && <CommonHeader navigation={navigation}/>}

    <View style={styles.container}>
    
        <View style={styles.title}>
            <Icon name='account-group-outline' color='#7C7C7C' size={24}/>
            <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Редактировать профиль</Text>
        </View>


          <TextInput
              label="Имя"
              value={formData.name}
              placeholder={'Имя'}
              onChangeText={(text) => setFormData({...formData, name: text})}
              />
          <TextInput
              label="Фамилия"
              value={formData.lastname}
              placeholder={'Фамилия'}
              onChangeText={(text) => setFormData({...formData, lastname: text})}
              />
          <TextInput
              label="Должность"
              value={formData.position}
              placeholder={'Должность'}
              onChangeText={(text) => setFormData({...formData, position: text})}
              />
          <TextInput
              label="E-mail"
              value={formData.email}
              placeholder={'E-mail'}
              onChangeText={(text) => setFormData({...formData, email: text})}
              />
          <TextInput
              label="Ссылка на отчетность"
              value={formData.report}
              placeholder={'http://...'}
              onChangeText={(text) => setFormData({...formData, report: text})}
              />

          <Picker
            selectedValue={formData.division}
            onValueChange={(itemValue, itemIndex) =>
              setFormData({...formData, division: itemValue})
            }>
                <Picker.Item label={'Выберите отдел'} value={''}  />
              {departments && departments.map((el,i)=>{
                return(
                <Picker.Item key={'departmentsss'+i} label={el.divname} value={el.divname} />
                )
              })}
          
          </Picker>
    
          <Button 
              title="Подтвердить" 
              onPress={onSubmit}
              disabled={
                formData.name.length>1 &&
                formData.lastname.length>1 &&
                formData.position.length>1 &&
                formData.division &&
                formData.email.length>1 &&
                formData.report.length>1 ? false : true
              }
              />
 
      </View>
 
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
  titles:{
    marginVertical: 15,
    fontSize: 18,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .7,
    height: 49,
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight:14,
    justifyContent: 'center',
    // alignItems: 'center'
    height: 49,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // paddingVertical: 5,
  },
  texts: {
    fontSize: 24,
    marginVertical: 'auto',
  },

  icons: {
    alignSelf: 'center',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,

  },
 

});



export default Profile
