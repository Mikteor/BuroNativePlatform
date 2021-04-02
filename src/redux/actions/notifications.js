import {NEW_NOTIFICATION, CLEAR_NOTIFICATIONS} from '../types'

export const newNotif = (data) => async dispatch  => {
    
    dispatch({
        type: NEW_NOTIFICATION,
        payload: data
    })
        }

export const clearNotifs = () => async dispatch  => {

    dispatch({
        type: CLEAR_NOTIFICATIONS,
        payload: 'clear notifs'
    })
        }