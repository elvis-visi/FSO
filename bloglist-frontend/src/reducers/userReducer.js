import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification, clearNotification } from './notificationReducer'

const userSlice = createSlice({

    name:'user',
    initialState: null,
    reducers: {
        setUser(state,action){
           return action.payload
        },
        clearUser(state){
         window.localStorage.clear()
          return null
        }
    }

})

export const { setUser, clearUser } = userSlice.actions;

//1. login in

export const loginIn = ({username, password}) => {
    return async dispatch => {
       try{
            //1. login(credentials) -> user token sent back
            const user = await loginService.login({username,password})
            //2. user  mapping in localStorage
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            //3. setToken ->  add 'bearer to the token', required by the authorization header
            blogService.setToken(user.token)
            dispatch(setUser(user))
       }
        catch(error){
            dispatch(setNotification(`Wrong credentials`)); 
            setTimeout(() => {
                dispatch(clearNotification()); 
            }, 5000);
        }
    }
}


export default userSlice.reducer