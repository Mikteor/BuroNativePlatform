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
import CommonHeader from '../../../components/common/header/commonHeader'
import { ScrollView } from 'react-native';


const Profile = ({navigation,initial}) => {
const dispatch = useDispatch()

const profile = useSelector(state => state.auth.user)
const departments = useSelector(state => state.departments.departments)
// console.log('initial:' ,initial)
const [formData, setFormData ] = useState({
  name: '',
  lastname: '',
  position: '',
  division:  '',  
  email:  '', 
  phone:  '', 
  report:  '',

});

useEffect(()=>{
// console.log('what')

  profile && setFormData({
    name: profile.name || '',
    lastname: profile.lastname || '',
    position: profile.position || '',
		division: profile.division? profile.division.divname : '',  
    email: profile.email  || '',
    phone: profile.phone  || '',
		report: profile.report  || '', 
  })
},[profile])

useEffect(()=>{
  dispatch(allDepartments())
},[])

const onSubmit = e => {
  e.preventDefault();
  // console.log( 'formDataEdit',formData)

  dispatch(joinDepartment(formData.division))
  dispatch(changeData(formData))
  !initial && navigation.pop()
  }
useEffect(()=>{
  console.log('lol',formData.division)
},[formData])
  return (

    <View style={{flex:1,}}>
        {!initial && <CommonHeader navigation={navigation} title='Редактировать профиль'/>}

    <ScrollView style={styles.container}>
    
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
              label="Телефон"
              value={formData.phone}
              placeholder={'Телефон'}
              onChangeText={(text) => setFormData({...formData, phone: text})}
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
                formData.name.length>0 &&
                formData.lastname.length>0 &&
                formData.position.length>0 &&
                formData.phone.length>0 &&
                // formData.division.length>0 &&
                formData.email.length>0 ?
                 false : true
              }
              />
 
      </ScrollView>
 
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
