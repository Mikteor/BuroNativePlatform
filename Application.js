import React, { useEffect, useState } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { login } from './src/redux/actions/auth'
import {loadUser} from './src/redux/actions/auth'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { setAuthToken } from './src/components/utils/axios';

import Login from './src/components/login/login'
import Main from './src/screens/main'
import Projects from './src/screens/projects'
import News from './src/screens/news'
import Profille from './src/screens/profile'
import Menu from './src/screens/menu'

import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Icon } from 'react-native-elements'
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
const dispatch = useDispatch()
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
  
  
  const mainIcon = <Icon name='g-translate' color='#00aced' size={24} />

  return (
    
    <View style={styles.container}>
    {/* <View style={{position: 'absolute', left: 0, top: 0, height: 100, width: 100, backgroundColor: 'black', zIndex:999}}>
          <Text style={{color: 'white'}}>absolute</Text>
      </View> */}
    {!isAuthenticated?  
    <Login /> :
        <Tab.Navigator>
            <Tab.Screen name='Главная' >
              {props => <Main {...props} exit={()=>exit()}/>}
            </Tab.Screen>
            <Tab.Screen name='Проекты' component={Projects} options={{tabBarIcon : ({ color, size }) => (<Icon name="rocket" color='#900' size={24}  />)}} />
            <Tab.Screen name='Новости' component={News} />
            <Tab.Screen name='Профиль' component={Profille} />
            <Tab.Screen name='Меню' component={Menu} />
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
