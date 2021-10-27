import { createSlice } from "@reduxjs/toolkit";

const allMessageSlice = createSlice({
    name : 'actif' ,
    initialState : [] ,
    reducers : {
        fetchAllMessage : (state  , action) => {
            return [...action.payload]
        },
        updateOneMessage : (state , action) => {
            let rightOne = state.find( msg => msg.friend === action.payload.friend)
            if (rightOne === undefined) {
                console.log('--> err updateOneMEssage : ' , rightOne  );
            } else {
                rightOne.messages = action.payload.messages
            }
            
        },
        addOneMessage : (state , action) =>{
            state.push(action.payload)
        }
    }
})

export const {fetchAllMessage , updateOneMessage ,addOneMessage} = allMessageSlice.actions
export default allMessageSlice.reducer