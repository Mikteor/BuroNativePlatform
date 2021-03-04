import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet,  View, Button , Text} from 'react-native';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const EditRow = ({content, placehold,onChangeT}) => {
const dispatch = useDispatch()

const profile = useSelector(state => state.auth.user)
const departments = useSelector(state => state.departments.departments)


const [edit, setEdit] = useState(false)


const [formData, setFormData ] = useState({
  name: '',
  lastname: '',
  position: '',
  division:  '',  
  email:  '', 
  report:  '',

});

useEffect(()=>{
console.log('profile',profile)
  profile && setFormData({
    name: profile.name || 'Name',
    lastname: profile.lastname,
    position: profile.position,
		division: profile.division,  
    email: profile.email ,
		report: profile.report , 
  })
},[profile])


const onSubmit = e => {
  e.preventDefault();

  

  console.log(formData, 'formData')
  dispatch(editProfile(formData))
  dispatch(allPlayers(find='all',city=false))
  dispatch(myInfo())

  navigation.navigate('Menu')
  }
const cancel = (pla) =>{

  pla=='name' && (setFormData({...formData, name: profile.name}), setName(false))
  pla=='lastname' && (setFormData({...formData, lastname: profile.lastname}), setLastName(false))
  pla=='city' && (setFormData({...formData, city: profile.city}), setCity(false))
}

  return (
    <View>
     
          {!edit?
          <View style={styles.textContainer}>
              <Text style={styles.texts} >
                {content}
              </Text> 
              <Icon name='pencil-outline' size={24} color='black' onPress={()=>setEdit(true)} style={styles.icons} />
          </View> :
          <View style={styles.inputContainer}>
              <Input
                placeholder={placehold}
                onChangeText={onChangeT}
                // leftIcon={<Icon name="account" size={24} color="black" />}
              />
              <Icon name='cancel' size={24} color='black' onPress={()=>setEdit(false)} style={styles.icons} />
          </View> 
          }
     
      
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



export default EditRow
