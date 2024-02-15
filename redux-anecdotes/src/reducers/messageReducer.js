import { createSlice } from '@reduxjs/toolkit'

const initialState = 'message'

const messageSlice = createSlice({
    name:'message',
    initialState,
    reducers:{
        createMessage(state,action){
            return action.payload
        }
    }

})

export const {createMessage} = messageSlice.actions
export default messageSlice.reducer