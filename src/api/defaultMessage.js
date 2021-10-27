import axios from "axios";
import server from "./config";

const fetchDefaultMessage = async (user) => {
    try {
        //console.log(user);
        const result = await axios.get(`${server}/defaultMessage/${user}`)
        return result.data
    } catch (err) {
        console.log(err);
    }
    
    
}

export default fetchDefaultMessage