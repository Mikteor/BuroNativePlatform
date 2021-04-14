
import axios from 'axios'
import {NEW_IP} from '@env'

export const url = NEW_IP;
// console.log(url,'uuuuuuuuuuuuuu')
// console.log('url', url)

export const setAuthToken = (token) => {
    // console.log(token, 'token')

    if(token){
        innerBackend.defaults.headers.common['auth-token'] = token;
    } 
}




export const innerBackend = axios.create ({
        baseURL: url,
        headers: {
            accept: 'application/json',
        
        }
       
    })





export const instance = axios.create({
    baseURL: url,
    headers: {
        accept: 'application/json',
      }})



