
import {REGISTER, AUTH_ERROR, LOGIN, USER_LOADED, CHANGE_USERDATA, CHANGE_AVATAR, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, CLEAR_MSG, CLEAR_ERROR, LOG_OUT, JOIN_DEPARTMENT, NOTIFICATION_CLICK} from '../types'
// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    user: null,
    isAuthenticated: false,
    token: false,
    msg:'',
    error: '',
    loaded: false,
    chosenSprint: false
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case REGISTER:
        case LOGIN:
            
             AsyncStorage.setItem('token', payload.token)
             
            return {
                ...state,
                loaded: true,
                token: !state.token,
                error: payload.err,
                msg: payload
            }
            case LOG_OUT:
                AsyncStorage.removeItem('token')
                return{
                    ...state,
                    token:!state.token
                }
            case CLEAR_ERROR:
                return {
                    ...state,
                   error:''
                }
            case CLEAR_MSG:
                return {
                    ...state,
                    msg:''
                }
            case USER_LOADED:
                return {
                    ...state,
                    loaded: true,
                    isAuthenticated: true,
                    user: payload
                }
                case CHANGE_LOADED:
                    return {
                        ...state,
                        loaded: true
                    }
            
                case CHANGE_USERDATA:
                    return {
                        ...state,
                        user: payload,
                        loaded: true,
                        
                    }
                    case CHANGE_AVATAR:
                        return {
                            ...state,
                        
                            loaded: false,
                            msg: payload.msg,
                            user: payload.user,
                        }
                case ADD_SPRINT_TO_CHOSEN:
                    // console.log('here is payload',payload)    
                
                return {

                        ...state,
                        chosenSprint:!state.chosenSprint,
                        // msg: payload.msg,
                        user: payload
                    }
                    case JOIN_DEPARTMENT:
                        return{
                            ...state,
                            user: payload.user
                        }
                            
                        
            case AUTH_ERROR:
                return {
                    ...state,
                    
                    isAuthenticated: false,
                    error: payload.err
                }
            case NOTIFICATION_CLICK:
                return {
                    ...state,
                    user: payload
                }
            
            default: 
                return state;
    }

} 
