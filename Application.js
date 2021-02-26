import React, { useEffect, useState } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from './src/redux/actions/auth'
import {loadUser} from './src/redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Button, StatusBar } from 'react-native';

// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setAuthToken } from './src/components/utils/axios';

//login
import Login from './src/components/login/login'
import Registration from './src/components/login/registration'

// screens 
import Main from './src/screens/main'
import Project from './src/screens/menu/projects/project'
import Department from './src/screens/department'
import News from './src/screens/news'
import Office from './src/screens/office'
import Menu from './src/screens/menu'
import EditProfile from './src/screens/menu/editProfile';
import AllDepartments from './src/screens/menu/allDepartments'
import BuroTeam from './src/screens/menu/buroTeam'
import Smejniki from './src/screens/menu/smejniki'
import Projects from './src/screens/menu/projects/projects'
//
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Icon } from 'react-native-elements'
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { allNews } from './src/redux/actions/news';
import { findDepartment } from './src/redux/actions/department';
import { likedProposes } from './src/redux/actions/office';
import { allProjects } from './src/redux/actions/projects';

export default function App() {
const dispatch = useDispatch()
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const tokenBoulean = useSelector(state=> state.auth.token)
const user = useSelector(state=>state.auth.user)

const [isAuthenticated, setIsAuthenticated] = useState(false)

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
      user && user.division && dispatch(findDepartment(user.division.divname))
      dispatch(likedProposes())
      dispatch(allProjects())
    }
    
  }
  useEffect(()=>{
    loadAll()
  },[isAuthenticated])
  // const mainIcon = <Icon name="home-outline" color={color} size={24}  />

  return (
    
    <View style={styles.container}> 
      <StatusBar hidden={true}/>

    {/* <View style={{position: 'absolute', left: 0, top: 0, height: 100, width: 100, backgroundColor: 'black', zIndex:999}}>
          <Text style={{color: 'white'}}>absolute</Text>
      </View> */}
    {!isAuthenticated?  
      <Stack.Navigator headerMode='none'>
          <Stack.Screen name='login' component={Login}/>
          <Stack.Screen name='registration' component={Registration}/>
      </Stack.Navigator>  :

      <Tab.Navigator 
          tabBarOptions={{
                activeTintColor: 'white', 
                inactiveTintColor: 'grey', 
                activeBackgroundColor: '#3F496C', 
                inactiveBackgroundColor: '#3F496C',
                }}>
                  
          <Tab.Screen name='Главная' options={{tabBarIcon : ({ color, size }) => (<Icon name="home-outline" color={color} size={24}  />)}}>
            {e => 
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='main' component={Main}/>
                <Stack.Screen name='news' component={News}/>
            </Stack.Navigator>
            }
          </Tab.Screen>

          <Tab.Screen name='Отдел' component={Department} options={{tabBarIcon : ({ color, size }) => (<Icon name="account-group-outline" color={color} size={24}  />)}}/>
          
          <Tab.Screen  
                name='Create'  
                options={{
                  tabBarIcon : ({ color, size }) => (<Icon name="plus" color={color} size={50} style={{marginTop: 13}} />), 
                  tabBarLabel: ''
                  }}>
                  {e => 
                  <View></View>
                  }
          </Tab.Screen>

          <Tab.Screen name='Офис' component={Office} options={{tabBarIcon : ({ color, size }) => (<Icon name="human-greeting" color={color} size={24}  />)}}/>
          
          <Tab.Screen 
                name='Меню' 
                options={{
                  tabBarIcon : ({ color, size }) => (<Icon name="menu" color={color} size={24}  />),
                  }}>
                  {e => 
                  <Stack.Navigator headerMode='none'>
                    <Stack.Screen name='menu' component={Menu}/>
                    <Stack.Screen name='allDepartments' component={AllDepartments}/>
                    <Stack.Screen name='buroTeam' component={BuroTeam}/>
                    <Stack.Screen name='smejniki' component={Smejniki}/>
                    
                    <Stack.Screen name='editProfile' component={EditProfile}/>
                    <Stack.Screen name='projects' component={Projects}/>
                    <Stack.Screen name='project' component={Project}/>
                    {/* <Stack.Screen name='toto' component={}/> */}
                  </Stack.Navigator>
                  }
          </Tab.Screen>

      </Tab.Navigator>
  
    }
      

 

    </View>  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: 'white',
  },
});
