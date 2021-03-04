import {REGISTER, AUTH_ERROR, LOGIN, USER_LOADED,CHANGE_AVATAR,CLEAR_MSG,CLEAR_ERROR, CHANGE_USERDATA, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, SPRINT_ERROR, LOG_OUT} from '../types'
import {innerBackend, instance, setAuthToken, url} from '../../components/utils/axios'

import axios from 'axios'


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
      console.log(formData, 'data?')
      // console.log(axios, 'axios')
      const res = await instance.post('/auth', formData)




        console.log(res, 'respond')
        dispatch({
            type: LOGIN,
            payload: res.data
        })
                  setAuthToken(res.data.token);
                  setTimeout(() =>loadUser(),200)
                  

        }
      catch (err) {
        console.log('err', err);

        // const errors = err.response.data.err;
        // errors.map(err => {
          
        //    return dispatch({
        //     type: AUTH_ERROR,
        //     payload: err 
        // })
        // })            
      
    }

}


export const register = (formData) => async dispatch  => {


    try {
        console.log('register data' ,formData)
        const res = await instance.post('/users', formData)
        console.log('res',res)
        dispatch({
            type: REGISTER,
            payload: res.data
        })
        //  setAuthToken(localStorage.token);
        
      }
      catch (err) {
        console.log('error:::', err)
        const errors = err.response.data
 
    
           dispatch({
              type: AUTH_ERROR,
              payload: errors
        })
      

        
        
            
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
  if(file){
      form.append(
          'file',
          file
        )
  }
  

      // console.log(form.get('file'), 'file HERE')
   


      const res = await innerBackend.put(`/users/me/a`, form)
      dispatch({
          type: CHANGE_AVATAR,
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
