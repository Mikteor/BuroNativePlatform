import {CLEAR_NOTIFICATIONS, NEW_NOTIFICATION} from '../types'


const initialState = {
    notificationCounter: 0,
    notifications: [],
    

    
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case NEW_NOTIFICATION:
                return {
                    ...state,
                    notificationCounter: state.notificationCounter + 1,
                    notifications: [...state.notifications, payload]
                }

            case CLEAR_NOTIFICATIONS:
                return {
                    ...state,
                    notificationCounter: 0,
                    notifications: []
                }
                default:
                    return {
                        ...state
                    }
                }}