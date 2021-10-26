import axios from "axios";

const base = 'localhost:5000'
const postNewAccount = async (name , password , email) => {
    try {
       const result = await axios.post(`http://${base}/new-account` , {
           name , password , email
       }) 
       return result
    } catch (error) {
        console.log(error);
    }
    
};

export default postNewAccount
