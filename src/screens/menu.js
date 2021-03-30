import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/auth'
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput,  Modal } from 'react-native';
import { ListItem, Divider, Overlay, Button } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import {url} from '../components/utils/axios'
const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)

  const [exit, setExit] = useState(false)
const buttons = [
  {
  name: "Все отделы",
  navigate: 'allDepartments'
  },
    {
  name: "Все проекты",
  navigate: 'projects'
  },
    {
  name: "Сотрудники",
  navigate: 'buroTeam'
  },
  //   {
  // name: "Субподрядчики",
  // navigate: 'smejniki'
  // },
]
const scndGroup = [ 
  {name:'Изменить профиль',
  navigate: 'editProfile'
  },]



  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.avatar}>
          <ImageBackground source={user? {uri: `${url+user.avatar}`} : require('../../assets/ava.jpeg')} style={styles.avaBG}>
            <Text style={styles.name}>{user? user.fullname: 'Имя'}</Text>
            <Text style={styles.postition}>{user? user.position: 'Должность'}</Text>
          </ImageBackground>
      </View>

      {buttons.map((el,i)=>{
        return(
          <ListItem key={'buttons'+i} containerStyle={styles.buttContainer}
          onPress={()=>navigation.navigate(el.navigate)}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          >
              <Icon name="rhombus-outline" color='white' size={24}  />
              <ListItem.Content>
                <ListItem.Title style={styles.buttText}>{el.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
          </ListItem>
          )
      })}
      <Divider style={{marginVertical: 20,}}/>
      {scndGroup.map((el,i)=>{
        return(
          <ListItem key={'scndGroup'+i} containerStyle={styles.buttContainer}
          onPress={()=>navigation.navigate(el.navigate)}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          >
              <Icon name="rhombus-outline" color='white' size={24}  />
              <ListItem.Content>
                <ListItem.Title style={styles.buttText}>{el.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
          </ListItem>
          )
      })}
      <Divider style={{marginVertical: 20,}}/>

      <ListItem containerStyle={styles.exitButton} onPress={()=>setExit(true)}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          >
              <ListItem.Content>
                <ListItem.Title style={styles.buttText}>Выйти из аккаунта</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
        </ListItem>

      


    <Modal
        animationType="slide"
        transparent={true}
        visible={exit}
        
      >
        <View style={styles.modalCont}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>Вы уверены что хотите выйти?</Text>
            <View style={styles.modalBtns}>
              <Button type='clear' title='Да' onPress={()=>dispatch(logOut())} />
              <Button type='clear' title='Нет' onPress={()=>setExit(false)} />
            </View>
            
          </View>
        </View>
      </Modal>
 

    </ScrollView>
  );
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3F496C',
      
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  exitButton: {
    backgroundColor: '#3F496C',
    marginTop: -5,
    paddingLeft: 50,
    
  },
  buttContainer: {
    backgroundColor: '#3F496C',
  },
  buttText: {
    color: 'white',
  },
  avatar: {
    height: 150,
    marginBottom: 30,
  },
  avaBG : {
    flex: 1,
    resizeMode: "cover",
    paddingLeft: 10,
  },
  name: {
    marginTop: 'auto',
    fontSize: 24,
    color: 'white',
    textShadowRadius: 10,
    textShadowColor: 'black',
  },
  postition: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    textShadowRadius: 10,
    textShadowColor: 'black',
  },
  modalCont: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: 'black',
    width: 250,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalText: {
    color: 'white',
    fontSize: 20,
  },
  modalBtns:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  
  });

