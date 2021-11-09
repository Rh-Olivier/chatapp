import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModeContext } from "../context/mode";
import "../css/chatbox.css";
import { Container } from "react-bootstrap";
import server from "../api/config";
import { fetchAllMessage } from "../data/allmessageSlice";
import { socket } from "../api/socket";
import { Routes, Route } from "react-router-dom";
import ListFriend from "./listFriend";
import MessagePage from "./messagePage";
import Account from "./account";

const Chatbox = (props) => {
	const context = useContext(ModeContext);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.user);
	const msg = useSelector((state) => state.message);
	useEffect(() => {
		if (socket.disconnected) socket.connect();
		socket.emit("USER_CONNECTED", data.user.name);
		//console.log('disconnected : ' , socket.disconnected);
		socket.on("FETCH_MESSAGE", (result) => {
			//console.log("Message fetched ", result);
			dispatch(fetchAllMessage(result));
		});
		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line
	}, [data]);

	return (
		<Container
			fluid
			className="p-0"
			style={{ backgroundColor: context.bg, color: context.color }}
		>
			<Routes>
				<Route
					path="friend"
					element={<ListFriend setstate={props.setstate} />}
				/>

				<Route path="message" element={<MessagePage />} />

				<Route path="account" element={<Account />} />
			</Routes>
		</Container>
	);
};

export default Chatbox;
