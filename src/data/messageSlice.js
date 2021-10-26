import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

const messageSlice = createSlice({
    name : 'message' ,
    initialState ,
    reducers : {
        addMessage :( state, action) => {
            return {
                ...action.payload
            }
        },
        
    }
})

export const {  addMessage} = messageSlice.actions

export default messageSlice.reducer