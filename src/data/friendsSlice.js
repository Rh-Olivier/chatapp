import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const friendSlice = createSlice({
    name : 'friend' ,
    initialState ,
    reducers : {
        allFriend :( state, action) => {
            action.payload.forEach(element => {
                state.push(element)
            });
        }
    }
})

export const {  allFriend } = friendSlice.actions

export default friendSlice.reducer