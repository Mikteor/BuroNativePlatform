import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {loadUser} from './src/redux/actions/auth'
import { StyleSheet, Text, View,  StatusBar, Modal } from 'react-native';

// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { setAuthToken } from './src/components/utils/axios';

//login
import Login from './src/components/login/login'
import Loading from './src/components/common/loadingScreen'
import Registration from './src/components/login/registration'

// screens 
import Main from './src/screens/main'
import Project from './src/screens/menu/projects/project'
import MyDepartment from './src/screens/myDepartment'
import Office from './src/screens/office'
import Menu from './src/screens/menu'
import EditProfile from './src/screens/menu/edit/editProfile';
import AllDepartments from './src/screens/menu/allDepartments'
import BuroTeam from './src/screens/menu/buroTeam'
import Smejniki from './src/screens/menu/smejniki'
import Projects from './src/screens/menu/projects/projects'
import NewPropose from './src/screens/create/createPropose'
import CreateNews from './src/screens/create/createNews'
// import CreateNewSprint from './src/screens/create/createNewSprint'
import OpenSprint from './src/screens/menu/projects/openSprint'
import TeamMateProfile from './src/screens/menu/teamMateProfile'
import Department from './src/screens/menu/department'
import OneNews from './src/screens/menu/oneNews'
//
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Icon } from 'react-native-elements'
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { allNews } from './src/redux/actions/news';
import { allDepartments, findDepartment } from './src/redux/actions/department';
import { likedProposes } from './src/redux/actions/office';
import { allProjects } from './src/redux/actions/projects';
import * as RootNavigation from './RootNavigation';


import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'
import { newNotif } from './src/redux/actions/notifications';
import Preload from './src/components/common/introScreen'


export default function App({deviceToken, notification}) {
const dispatch = useDispatch()

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const tokenBoulean = useSelector(state=> state.auth.token)
const user = useSelector(state=>state.auth.user)

const [isAuthenticated, setIsAuthenticated] = useState(false)
const [createModal, setCreateModal] = useState(false)
const [preload, setPreload] = useState(true)

useEffect(()=>{
  setTimeout(() => {
    setPreload(false)
  }, 5000);
},[])

useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
        res ? setIsAuthenticated(true) : setIsAuthenticated(false)
        setAuthToken(res)
    })    
  },[tokenBoulean])

  const loadAll = () => {
    if(isAuthenticated){
      dispatch(loadUser())
      dispatch(allNews())
      dispatch(likedProposes())
      dispatch(allProjects())
      dispatch(allDepartments())
      user && user.division && dispatch(findDepartment(user.division.divname))
    }
  }
  useEffect(()=>{
    loadAll()
  },[isAuthenticated])


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     getPushData(remoteMessage)
    });

    return unsubscribe;
  }, []);
  // Register background handler
  useEffect(() => {
    const back = messaging().setBackgroundMessageHandler(async remoteMessage => {
     getPushData(remoteMessage)
    });
    return back;
  }, []);
  const getPushData = (message) => {
    dispatch(loadUser())
  }
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   PushNotification.localNotification({
//     channelId: 'channel-id',
//     title: remoteMessage.notification.title,
//     message: 'remoteMessage.notification.body',
//     largeIconUrl: remoteMessage.notification.android.imageUrl,
//   })
// });



  if(preload){
    return(
      <Preload />
    )
  }

  return (
    
    <View style={styles.container}> 
      <StatusBar hidden={true}/>

    {!isAuthenticated?  
      <Stack.Navigator headerMode='none'>
          <Stack.Screen name='login'>
              {props => <Login {...props} deviceToken={deviceToken} />}
          </Stack.Screen>
          <Stack.Screen name='registration'>
              {props => <Registration {...props} deviceToken={deviceToken} />}
          </Stack.Screen>
      </Stack.Navigator>  :


    user && !user.name? <EditProfile initial /> :



      <Tab.Navigator detachInactiveScreens={true}
          tabBarOptions={{
                style:{height:70,},
                labelStyle:{marginBottom: 20, marginTop:0 },
                iconStyle:{marginBottom:-10},
                activeTintColor: 'white', 
                inactiveTintColor: 'grey', 
                activeBackgroundColor: 'black', 
                inactiveBackgroundColor: 'black',
                }}>
                  
          <Tab.Screen name='Главная' options={{tabBarIcon : ({ color, size }) => (<Icon name="home-outline" color={color} size={24}  />)}} >
                {e => 
                  <Stack.Navigator headerMode='none' >
                    <Stack.Screen name='main' component={Main}/>
                    <Stack.Screen name='project' component={Project}/>
                    <Stack.Screen name='openSprint' component={OpenSprint}/>
                    <Stack.Screen name='oneNews' component={OneNews}/>
                  </Stack.Navigator>
                  }
          </Tab.Screen>
          <Tab.Screen name='Отдел' options={{tabBarIcon : ({ color, size }) => (<Icon name="account-group-outline" color={color} size={24}  />)}}>
                {e => 
                  <Stack.Navigator headerMode='none' >
                    <Stack.Screen name='department' component={MyDepartment}/>
                    <Stack.Screen name='project' component={Project}/>
                    <Stack.Screen name='teamMateProfile' component={TeamMateProfile}/>
                    <Stack.Screen name='openSprint' component={OpenSprint}/>
                  </Stack.Navigator>
                  }
          </Tab.Screen>
          <Tab.Screen  
                name='Create'  
                options={{
                  tabBarLabel: '',
                  tabBarButton:({accessibilityState})=> 
                  <View style={{ backgroundColor: 'black'}}>
                    <Icon name="plus" color={accessibilityState.selected? 'white': createModal? 'white' : 'grey'} size={55} style={{marginHorizontal: 10}}  onPress={()=>setCreateModal(true)} />
                  </View>,
                  }}
                  >
                  {e => 
                  <Stack.Navigator headerMode='none' >
                    <Stack.Screen name='createPropose' component={NewPropose}/>
                    <Stack.Screen name='createNews' component={CreateNews}/>
                  </Stack.Navigator>
                  }
          </Tab.Screen>
          <Tab.Screen name='Офис' component={Office} options={{tabBarIcon : ({ color, size }) => (<Icon name="human-greeting" color={color} size={24}/>)}}/>
          <Tab.Screen 
                name='Меню' 
                options={{
                  tabBarIcon : ({ color, size }) => (<Icon name="dots-horizontal" color={color} size={24}  />),
                  }}>
                  {props => 
                  <Stack.Navigator headerMode='none'>
                    <Stack.Screen name='menu' component={Menu}/>
                    <Stack.Screen name='allDepartments' component={AllDepartments}/>
                    <Stack.Screen name='buroTeam' component={BuroTeam}/>
                    <Stack.Screen name='smejniki' component={Smejniki}/>
                    <Stack.Screen name='editProfile' component={EditProfile}/>
                    <Stack.Screen name='projects' component={Projects}/>
                    <Stack.Screen name='project' component={Project}/>
                    <Stack.Screen name='openSprint' component={OpenSprint}/>
                    <Stack.Screen name='teamMateProfile' component={TeamMateProfile}/>
                    <Stack.Screen name='dep' component={Department}/>
                    <Stack.Screen name='oneNews' component={OneNews}/>
                  </Stack.Navigator>
                  }
          </Tab.Screen>
      </Tab.Navigator>
    }
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={createModal}
        onRequestClose={()=>setCreateModal(false)} 
      
      >
        <View style={styles.modalCont} onTouchEnd={()=>setCreateModal(false)}>
          <View style={styles.modalCard} >
            <View style={styles.modalBtn}>
              <Text style={styles.modalBtnText} onPress={()=>RootNavigation.navigate('Create', { screen: 'createNews' })}>Новость</Text>
            </View>
            <View style={styles.modalBtn}>
              <Text style={styles.modalBtnText} onPress={()=>RootNavigation.navigate('Create', { screen: 'createPropose' })}>Предложение</Text>
            </View>
          </View>
        </View>
      </Modal>



    </View>  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: 'white',
  },
  modalCont: {
    flex:1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalCard: {

    marginBottom: 80
  },
  modalBtn:{
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    marginBottom: 10,

  },
  modalBtnText: {
    color: 'white',
    fontSize: 20,
  },
  
});
