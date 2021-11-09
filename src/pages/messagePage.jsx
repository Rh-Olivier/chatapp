import { Container, Form, Button, Image } from "react-bootstrap";
import { RiArrowLeftLine, RiNavigationFill } from "react-icons/ri";
import Menu from "../components/chatOption";
import Message from "../components/renderMessage";
import { useSelector } from "react-redux";
import { socket } from "../api/socket";
import { nanoid } from "@reduxjs/toolkit";
import server from "../api/config";
import React, { useEffect, useState, useRef, useContext } from "react";
import { ModeContext } from "../context/mode";
import { useNavigate } from "react-router";
import '../css/slide.css'

const days = ["mon", "tue", "wed", "thur", "fri", "sun", "sat"];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aou",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const correctAvatar = (arr, u) => {
	let avatar;
	arr.forEach((item) => {
		if (item.name === u) {
			avatar = item.avatar;
		}
	});
	return avatar;
};

const MessagePage = () => {
	const context = useContext(ModeContext);
	const msg = useSelector((state) => state.message);
	const [Url, setUrl] = useState("");

	useEffect(() => {
		console.log("MEsssage from  redux ", msg);
	}, [msg]);

	const [state, setstate] = useState("");
	const handleChange = (e) => {
		e.preventDefault();
		setstate(e.target.value);
	};
	const handleSubmission = (e) => {
		e.preventDefault();
		if (state !== "") {
			// Create a new date
			const date = new Date();
			// Format : yy mm dd | hh : mn
			const dateString = `${days[date.getDay()]}-${
				months[date.getMonth()]
			}-${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
			//console.log('date' , dateString);
			socket.emit("SEND_MESSAGE", {
				user: msg.user,
				friend: msg.friend,
				id: nanoid(),
				content: state,
				timeStamp: dateString,
			});
			setstate("");
		}
	};

	const AllFriend = useSelector((state) => state.friend);

	// SCROLL AUTOMATICALY TO THE BOTTOM
	const messageEndRef = useRef(null);
	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const url = server + "/profil/" + correctAvatar(AllFriend, msg.friend);
		setUrl(url);
		scrollToBottom();
		// eslint-disable-next-line
	}, [msg]);


	const navigate = useNavigate()
	const goBack  = () => {
		navigate('/home/friend')
	};

	return (
		<div className='messageContainer fade-anim'>
			<RiArrowLeftLine className='back' onClick={() => goBack()}/>
			<Container
				fluid
				className="shadow header-message d-flex justify-content-between message-header"
			>
				<div className="d-flex">
					<Image
						src={Url}
						style={{
							width: "45px",
							height: "45px",
							borderRadius: "50%",
						}}
					/>
					<div className="d-flex flex-column ps-3">
						<h5 className="text-white"> {msg.friend} </h5>
					</div>
				</div>
				<div className=''>
					<Menu />
				</div>
				
			</Container>

			<Container fluid className="body-message overflow-auto my-2 py-3">
				<ul>
					<Message setUrl={setUrl} scroll={scrollToBottom} />
					<div ref={messageEndRef}></div>
				</ul>
			</Container>
			<Container fluid className="shadow footer border border-2 border-primary">
				<Form className="d-flex pt-3" onSubmit={handleSubmission}>
					<Form.Control
						as="textarea"
						placeholder="Type your message here"
						className={context.dark ? "pl-dark" : null}
						value={state}
						name="content"
						onChange={handleChange}
					/>
					<div>
						<Button type="submit" className="ms-2 mt-2" variant="white">
							<RiNavigationFill
								color="blue"
								style={{ width: "30px", height: "30px" }}
							/>
						</Button>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default MessagePage;
