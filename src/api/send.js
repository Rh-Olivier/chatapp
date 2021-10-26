import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import server from "./config";


const sendMessage  = async (user , friend , id = nanoid()  , content , timeStamp ) => {
    try {
        const res = axios.post(`${server}/send` , {
            user : user , friend : friend , id : id ,
             content : content , timeStamp : timeStamp
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
  };

  export default sendMessage