import axios from "axios";
import server from "./config";

const fetchCurrentMessage = async (user ,friend) => {
    try {
        const result = await axios.get(`${server}/currentMessage/${user}/${friend}`)
        return result.data
    } catch (err) {
        console.log(err);
    }
    
    
}

export default fetchCurrentMessage