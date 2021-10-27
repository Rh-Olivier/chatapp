import axios from "axios";
import server from "./config";

const deleteMessage = async (user, friend) => {
	try {
		const res = await axios.delete(`${server}/delete`, {
			data: {
				user: user,
				friend: friend,
			},
		});
		//console.log('delete' ,  res);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export default deleteMessage;
