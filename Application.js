import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import {loadUser} from './src/redux/actions/auth'
import { StyleSheet, Text, View,  StatusBar, Modal } from 'react-native';

// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { setAuthToken } from './src/components/utils/axios';

//login
import Login from './src/components/login/login'
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

export default function App({deviceToken}) {
const dispatch = useDispatch()
// const navigation = useNavigation()
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const tokenBoulean = useSelector(state=> state.auth.token)
const user = useSelector(state=>state.auth.user)

const [isAuthenticated, setIsAuthenticated] = useState(false)
const [createModal, setCreateModal] = useState(false)
const [redirect, setReditect] = useState(false)

useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
      // console.log('result::::::::::::::::::',res)
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
                activeTintColor: 'white', 
                inactiveTintColor: 'grey', 
                activeBackgroundColor: '#3F496C', 
                inactiveBackgroundColor: '#3F496C',
                }}>
                  
          <Tab.Screen name='Главная' options={{tabBarIcon : ({ color, size }) => (<Icon name="home-outline" color={color} size={24}  />)}} >
                {e => 
                  <Stack.Navigator headerMode='none' >
                    <Stack.Screen name='main' component={Main}/>
                    <Stack.Screen name='project' component={Project}/>
                    <Stack.Screen name='openSprint' component={OpenSprint}/>
                    {/* <Stack.Screen name='createSprint' component={CreateNewSprint}/> */}
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
                    {/* <Stack.Screen name='createSprint' component={CreateNewSprint}/> */}
                  </Stack.Navigator>
                  }
          </Tab.Screen>
          <Tab.Screen  
                name='Create'  
                options={{
                  tabBarLabel: '',
                  tabBarButton:()=>
                  <View style={{ backgroundColor: '#3F496C'}}>
                    <Icon name="plus" color={'white'} size={50} style={{marginHorizontal: 10}}  onPress={()=>setCreateModal(true)} />
                  </View>
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
                    {/* <Stack.Screen name='createSprint' component={CreateNewSprint}/> */}
                    <Stack.Screen name='openSprint' component={OpenSprint}/>
                    <Stack.Screen name='teamMateProfile' component={TeamMateProfile}/>
                    <Stack.Screen name='dep' component={Department}/>
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

    marginBottom: 60
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
