import React, { useEffect, useState } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from './src/redux/actions/auth'
import {loadUser} from './src/redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setAuthToken } from './src/components/utils/axios';

import Login from './src/components/login/login'
import Main from './src/screens/main'
import Projects from './src/screens/projects/projects'
import Project from './src/screens/projects/project'
import Department from './src/screens/department'
import News from './src/screens/news'
import Profille from './src/screens/profile/profile'
import Menu from './src/screens/menu'
import EditProfile from './src/screens/profile/editProfile';


import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Icon } from 'react-native-elements'
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';



export default function App() {
const dispatch = useDispatch()
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const tokenBoulean = useSelector(state=> state.auth.token)
const [isAuthenticated, setIsAuthenticated] = useState(false)

useEffect(() => {
    AsyncStorage.getItem('token').then(res => {
        setIsAuthenticated(res)
        setAuthToken(res)
    }) 


    if(isAuthenticated){
      dispatch(loadUser());

    }


  },[tokenBoulean])
  
  
  // const mainIcon = <Icon name='g-translate' color='#00aced' size={24} />

  return (
    
    <View style={styles.container}> 
    {/* <View style={{position: 'absolute', left: 0, top: 0, height: 100, width: 100, backgroundColor: 'black', zIndex:999}}>
          <Text style={{color: 'white'}}>absolute</Text>
      </View> */}
    {!isAuthenticated?  
     <Stack.Navigator headerMode='none'>
        <Stack.Screen name='login' component={Login}/>
        {/* <Stack.Screen name='registration' component={Registration}/> */}
     </Stack.Navigator>  :
        <Tab.Navigator tabBarOptions={{activeTintColor: 'white', inactiveTintColor: 'grey', activeBackgroundColor: '#3F496C', inactiveBackgroundColor: '#3F496C',}}>
            <Tab.Screen name='Главная' options={{tabBarIcon : ({ color, size }) => (<Icon name="home-outline" color={color} size={24}  />)}}>
              {e => 
              <Stack.Navigator headerMode='none'>
                  <Stack.Screen name='main' component={Main}/>
                  <Stack.Screen name='news' component={News}/>
              </Stack.Navigator>
              }
            </Tab.Screen>
            <Tab.Screen name='Проекты' options={{tabBarIcon : ({ color, size }) => (<Icon name="folder-multiple-outline" color={color} size={24}  />)}}>
              {e => 
              <Stack.Navigator headerMode='none'>
                <Stack.Screen name='projects' component={Projects}/>
                <Stack.Screen name='project' component={Project}/>
              </Stack.Navigator>
              }
              
            </Tab.Screen>
            <Tab.Screen name='Отдел' component={Department} options={{tabBarIcon : ({ color, size }) => (<Icon name="account-group-outline" color={color} size={24}  />)}}/>
            <Tab.Screen name='Профиль'  options={{tabBarIcon : ({ color, size }) => (<Icon name="human-greeting" color={color} size={24}  />)}}>
              {e=>
              <Stack.Navigator headerMode='none'>
                <Stack.Screen name='profile' component={Profille}/>
                <Stack.Screen name='editProfile' component={EditProfile}/>
              </Stack.Navigator>
              }
            </Tab.Screen>
            <Tab.Screen name='Меню' options={{tabBarIcon : ({ color, size }) => (<Icon name="menu" color={color} size={24}  />)}}>
              {e => 
              <Stack.Navigator headerMode='none'>
                <Stack.Screen name='menu' >
                  {props => <Menu {...props} exit={()=>exit()}/>}
                </Stack.Screen>
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
    backgroundColor: '#fff',
   
  },
});
