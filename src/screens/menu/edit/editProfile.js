import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet,  View, Button , Text, } from 'react-native';
import {Picker} from '@react-native-community/picker'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, Divider } from 'react-native-elements'

// import {  } from '../../redux/actions/auth';
import {allUsers} from '../../../redux/actions/user'
import {loadUser} from '../../../redux/actions/auth'

import {changeData, changeAvatar} from '../../../redux/actions/auth'
import { allDepartments, joinDepartment, findDepartment } from "../../../redux/actions/department";
import EditRow from '../../../components/edit/editProfileRow'

const Profile = ({navigation}) => {
const dispatch = useDispatch()

const profile = useSelector(state => state.auth.user)
const departments = useSelector(state => state.departments.departments)

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
    name: profile.name || 'Имя',
    lastname: profile.lastname || 'Фамилия',
    position: profile.position || 'Должность',
		division: profile.division? profile.division.divname : 'Отдел',  
    email: profile.email  || 'E-mail',
		report: profile.report  || 'ссылка на отчетность', 
  })
},[profile])

useEffect(()=>{
  dispatch(allDepartments())
},[])

const onSubmit = e => {
  e.preventDefault();
  console.log(formData, 'formDataEdit')

  dispatch(joinDepartment(formData.division))
  dispatch(changeData(formData))
  setTimeout(() => {
  dispatch(loadUser())
  profile && profile.division && dispatch(findDepartment(profile.division.divname))
  navigation.pop()
  }, 300);
  }


  return (
    <View style={styles.container}>
      <View style={styles.title}>
          <Icon name='account-group-outline' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Редактировать профиль</Text>
      </View>
      
      <EditRow  content={formData.name} placehold={'Имя'} onChangeT={(text) => setFormData({...formData, name: text})} />
      <EditRow  content={formData.lastname} placehold={'Фамилия'} onChangeT={(text) => setFormData({...formData, lastname: text})} />
      <EditRow  content={formData.position} placehold={'Должность'} onChangeT={(text) => setFormData({...formData, position: text})} />
      <EditRow  content={formData.email} placehold={'E-mail'} onChangeT={(text) => setFormData({...formData, email: text})} />
      <EditRow  content={formData.report} placehold={'Отчет'} onChangeT={(text) => setFormData({...formData, report: text})} />

      <Picker
        selectedValue={formData.division}
        onValueChange={(itemValue, itemIndex) =>
          setFormData({...formData, division: itemValue})
        }>
          {departments && departments.map((el,i)=>{
            return(
            <Picker.Item label={el.divname} value={el.divname} />
            )
          })}
       
      </Picker>
 
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
