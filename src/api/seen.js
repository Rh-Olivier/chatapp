import axios from "axios";
import server from "./config";

const seenUpdate = async (user, friend) => {
	try {
		const result = await axios.put(`${server}/seen`, {
			user: user,
			friend: friend,
		});
		return result.data;
	} catch (err) {
		console.log(err);
	}
};

export default seenUpdate;
