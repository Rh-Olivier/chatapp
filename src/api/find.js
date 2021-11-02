import axios from "axios";
import server from "./config";

const findOneUser = async (user) => {
    try {
        //console.log(user);
        const result = await axios.get(`${server}/find/${user}` )
        return result.data
    } catch (err) {
        console.log(err);
    }
    
    
}

export default findOneUser