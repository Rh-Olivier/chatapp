import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import friendReducer from "./friendsSlice";
import allMessageReducer from "./allmessageSlice";


export default configureStore({
    reducer : {
        user : userReducer ,
        message : messageReducer,
        friend : friendReducer ,
        allMessage : allMessageReducer
    }
})