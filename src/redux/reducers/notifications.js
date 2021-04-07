import {CLEAR_NOTIFICATIONS, NEW_NOTIFICATION, NOTIFICATION_CLICK} from '../types'


const initialState = {
    notificationCounter: 0,
    notifications: [],
    notificationHistory: []
    

    
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
            // case NOTIFICATION_CLICK:
            //     const clickedEl = state.notifications.find(el => el.messageId==payload)
            //     const clickedIndex = state.notifications.findIndex(el => el.messageId==payload)
            //     let newNotifs = state.notifications
            //     newNotifs.splice(clickedIndex, 1)
            //     const newHistory = [...state.notificationHistory, clickedEl]
            //     return {
            //         ...state,
            //         notifications: newNotifs,
            //         notificationHistory: newHistory,
            //         notificationCounter: newNotifs.length,
                    
            //     }

            case CLEAR_NOTIFICATIONS:
                const someNew = state.notifications.length>0 ? state.notifications : null
                const toHistory = someNew? state.notificationHistory.concat(someNew) : state.notificationHistory
                const slicedHistory = toHistory.length>2 ? toHistory.slice(-10) : toHistory
                return {
                    ...state,
                    notificationCounter: 0,
                    notificationHistory: slicedHistory,
                    notifications: []
                }
                default:
                    return {
                        ...state
                    }
                }}