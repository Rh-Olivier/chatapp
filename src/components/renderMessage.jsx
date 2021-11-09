import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import server from "../api/config";
import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
import fetchDefaultMessage from "../api/defaultMessage";
import { io } from "socket.io-client";
import { updateOneMessage } from "../data/allmessageSlice";
import { addMessage } from "../data/messageSlice";




const correctAvatar = (arr, u) => {
	let avatar;
	arr.forEach((item) => {
		if (item.name === u) {
			avatar = item.avatar;
		}
	});
	return avatar;
};

const Message = ({ setUrl , scroll }) => {
	const [message, setmessage] = useState([]);
	useEffect(() => {
		//console.log("after click message ", message);
		scroll()
		// eslint-disable-next-line
	}, [message]);

	const dispatch = useDispatch();

	const AllFriend = useSelector((state) => state.friend);
	const user = useSelector((state) => state.user);

	// Current message viewed in the ui
	const messageRedux = useSelector((state) => state.message);

	useEffect(() => {
		if (messageRedux.hasOwnProperty("user")) {
			//console.log("msg redux ", messageRedux);
			setmessage([]);
			setmessage(messageRedux.messages);
		}
	}, [messageRedux]);

	const socket = io(server);
	socket.on(`${user.user.name}`, (data) => {
		console.log("from event ", data);
		// ---> {user , friend , messages }
		dispatch(updateOneMessage(data));

		// if the user is chatting with the friend who sent
		// the message , dispatch it directly to the UI
		if (data.friend === messageRedux.friend ) {
			dispatch(addMessage(data))
		}
		socket.disconnect();
	});

	const render = message.map((item) => {
		const { id, author, content, timeStamp } = item;
		//console.log("user : ", user);
		if (author === user.user.name) {
			return (
				<li
					key={id}
					className="d-flex flex-column align-items-end"
				>
					<div className="border border-1 border-primary user-sms">
						<div className="d-flex justify-content-end">{content}</div>
						<div className='timeStamp'>{timeStamp}</div>
					</div>
				</li>
			);
		} else {
			const url = server + "/profil/" + correctAvatar(AllFriend, author);
			setUrl(url);
			console.log('url ' , url)
			return (
				<li key={id} className="d-flex friend-box">
					<div>
						<Image
							src={url}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
						/>
					</div>
					<div className="bg-radient text-white friend-sms">
						<div>{content}</div>
						<div className='timeStamp'>{timeStamp}</div>
					</div>
				</li>
			);
		}
	});

	return render;
};

export default Message;
