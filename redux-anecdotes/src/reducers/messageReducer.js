import { createSlice } from '@reduxjs/toolkit'

const initialState = 'message'

const messageSlice = createSlice({
    name:'message',
    initialState,
    reducers:{
        createMessage(state,action){
            return action.payload
        },
        removeNotification(){
            return null;
        
        }
    }

})

export const {createMessage, removeNotification} = messageSlice.actions
export default messageSlice.reducer