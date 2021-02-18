
import {REGISTER, AUTH_ERROR, LOGIN, USER_LOADED, CHANGE_USERDATA, CHANGE_AVATAR, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, CLEAR_MSG, CLEAR_ERROR, LOG_OUT} from '../types'
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
            console.log(payload, 'payload token')
            //  storage.save({key:'token', data: payload.token});
             AsyncStorage.setItem('token', payload.token).then(console.log('token placed')).catch(console.log('token fail'))
             
            //  console.log(AsyncStorage.token, 'NEW TOKEN ')
            return {
                ...state,
                loaded: true,
                token: true,
                error: payload.err,
                msg: payload
            }
            case LOG_OUT:
                AsyncStorage.removeItem('token')
                return{
                    ...state,
                    token:false
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
                      
                        loaded: false,
                        msg: payload.msg
                    }
                    case CHANGE_AVATAR:
                        return {
                            ...state,
                        
                            loaded: false,
                            msg: payload.msg
                        }
                case ADD_SPRINT_TO_CHOSEN:
                    console.log('here is payload',payload)    
                
                return {
                        ...state,
                        chosenSprint:!state.chosenSprint,
                        msg: payload.msg
                    }
            case AUTH_ERROR:
                console.log('here is payload',payload) 
                return {
                    ...state,
                    
                    isAuthenticated: false,
                    error: payload.err
                }
            
            
            default: 
                return state;
    }

} 
