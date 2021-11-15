import axios from "axios";
import server from "./config"

const postNewAccount = async (name , password , email) => {
    try {
       const result = await axios.post(`${server}/new-account` , {
           name , password , email
       }) 
       return result
    } catch (error) {
        console.log(error);
    }
    
};

export default postNewAccount
