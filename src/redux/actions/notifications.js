import {NEW_NOTIFICATION, CLEAR_NOTIFICATIONS, NOTIFICATION_CLICK} from '../types'
// import {useSelector} from 'react-redux'
import { innerBackend } from "../../components/utils/axios";



export const newNotif = (data) => async dispatch  => {
// const notifs = useSelector(state=> state.notifications.notifications)
//    const notUnique = notifs.some(el => el.messageId == data.messageId)
//    console.log(notUnique)
    dispatch({
        type: NEW_NOTIFICATION,
        payload: data
    })
        }


export const notifClick = (id) => async dispatch  => {
    try {
        const idArray = {ids:[id]}
        const res = await innerBackend.put('/users/notificationread', idArray)

        dispatch({
            type: NOTIFICATION_CLICK,
            payload: res.data
        })

        }
      catch (err) {
        // console.log('notif click error:', err)          
      
    }

        }


export const clearNotifs = (notifIds) => async dispatch  => {

    try {
        const idArray = {ids: notifIds}
        const res = await innerBackend.put('/users/notificationread', idArray)
        // console.log('creating news')

        dispatch({
            type: NOTIFICATION_CLICK,
            payload: res.data
        })

        }
      catch (err) {
        // console.log('notif click error:', err)          
      
    }
        }