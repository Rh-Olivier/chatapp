import axios from "axios";
import server from "./config";


const login_process = async (email , password) => {
    try {
        const user_info = {email , password}
        const result = await axios.post(`${server}/login`, user_info )
        return result
    } catch (error) {
        console.log(error);
    }
    
   
}

export default login_process;