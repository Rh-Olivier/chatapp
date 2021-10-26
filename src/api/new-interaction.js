import axios from "axios";
import server from "./config";


const new_interaction = async (user , friend) => {
    try {
        const message_info = {user , friend}
        const result = await axios.post(`${server}/newInteraction`, message_info )
        return result
    } catch (error) {
        console.log(error);
    }
    
   
}

export default new_interaction;