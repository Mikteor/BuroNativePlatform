import {REGISTER, AUTH_ERROR, LOGIN, USER_LOADED,CHANGE_AVATAR,CLEAR_MSG,CLEAR_ERROR, CHANGE_USERDATA, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, SPRINT_ERROR, LOG_OUT} from '../types'
import {innerBackend, instance, setAuthToken, url} from '../../components/utils/axios'
import {Alert} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {url} from '../../components/utils/axios'


// LOAD USER 
export const loadUser = () => async dispatch => {
  try {
    
     
     const res = await innerBackend.get("/users/me");

    //  console.log(res, "/response???");
    
     dispatch({
       type: USER_LOADED,
       payload: res.data,
     });
  } catch (err) {
    // console.log(err.response.data, 'ERROR!!!')
  }
   
  };
    
export const msgAuthClear = ()=>dispatch => {
    
    return dispatch({
        type: CLEAR_MSG,
    
      })
}
export const errorAuthClear = ()=>dispatch => {
    
  return dispatch({
      type: CLEAR_ERROR,
  
    })
}
export const login = (formData) => async dispatch  => {
   
  
  
  try {
      // console.log(formData, 'data?')
      // console.log(axios, 'axios')
      const res = await instance.post('/auth', formData)




        // console.log( 'respond',res.data)
        dispatch({
            type: LOGIN,
            payload: res.data
        })
                  setAuthToken(res.data.token);
                  setTimeout(() =>loadUser(),200)
                  

        }
      catch (err) {
        // console.log('login error:::', err);
       
        const errors = err.response.data.errors
        // console.log(errors)
        errors.map(err => {
            Alert.alert('Ошибка', err.err)
        })            
      
    }

}


export const register = (formData) => async dispatch  => {


    try {
        // console.log('register data' ,formData)
        const res = await instance.post('/users', formData)
        // console.log('res',res)
        dispatch({
            type: REGISTER,
            payload: res.data
        })
        //  setAuthToken(localStorage.token);
        
      }
      catch (err) {
        // console.log('register error:::', err)
        // const errors = err.response.data
 
    
        //    dispatch({
        //       type: AUTH_ERROR,
        //       payload: errors
        // })
      

        
        
            
      } 

}
export const changeData = (formData) => async dispatch  => {
  /////////////////////////
  // let body ={
  //   name: formData.name,
  //   email: formData.email,
  //   position: formData.position,
    
  // }
  //////////////////////
  try {
      // console.log('hello change', formData)
      const res = await innerBackend.put(`/users/me`, formData)
      dispatch({
          type: CHANGE_USERDATA,
          payload: res.data
      })
  

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: AUTH_ERROR,
          payload: error.msg
      })
      })
          
    } 

}
export const changeAvatar = (file) => async dispatch  => {


  try {
  
  const form = new FormData()
        form.append(
          'file',
          {uri: file.uri, name: file.fileName, type: 'image/jpeg'}
        )
   
      let token = ''
      const wot = await AsyncStorage.getItem('token').then(res => token=res)  
     
     
      const res = await axios.put(`/users/me/a`, form, {
        baseURL: url,
        headers: {
          'content-type': 'multipart/form-data',
          'auth-token':token
        },
        
      })


      dispatch({
          type: CHANGE_AVATAR,
          payload: res.data
      })
  

    }
    catch (err) {
  // console.log('avatar change error',err),
  Alert.alert('avatar change error',err)
          
    } 

}


export const addToChosen = (id) => async dispatch  => {
  // console.log ('hi sprint', id)
  try {
      const res = await innerBackend.put(`projects/favsprint/${id}`)
      dispatch({
          type: ADD_SPRINT_TO_CHOSEN,
          payload: res.data
      })
      }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: SPRINT_ERROR,
          payload: error.msg
      })
      })            
    
  }

}


export const changeLoaded = () =>  dispatch => {
  return dispatch({
    type: CHANGE_LOADED,
    
  })
}

export const logOut = () =>  dispatch => {

  return dispatch({
    type: LOG_OUT,
    
  })
}
