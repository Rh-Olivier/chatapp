import { createSlice } from "@reduxjs/toolkit";

//const fromStorage = JSON.parse( localStorage.getItem('userData'));

const initialState = {}

const userSlice = createSlice({
    name : 'user' ,
    initialState ,
    reducers : {
        addUser :( state, action) => {
            console.log(state.user);
            state.user = action.payload
        }
    }
})

export const {  addUser } = userSlice.actions

export default userSlice.reducer