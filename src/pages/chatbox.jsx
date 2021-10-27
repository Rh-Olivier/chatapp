import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Image, Row, Col } from "react-bootstrap";
import { RiNavigationFill } from "react-icons/ri";
import Menu from "../components/chatOption";
import Message from "../components/renderMessage";
import SettingMenu from "../components/settingMenu";
import { ModeContext } from "../context/mode";
import "../css/chatbox.css";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../api/socket";
import ChatMenu from "../components/chatMenu";
//import sendMessage from "../api/send";
import { nanoid } from "@reduxjs/toolkit";
import { fetchAllMessage } from "../data/allmessageSlice";
import server from "../api/config";






const days = ['mon' , 'tue' , 'wed' , 'thur' , 'fri' , 'sun' ,'sat' ]
const months = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aou' , 'Sep' , 'Oct' , 'Nov' , 'Dec']



const correctAvatar = (arr, u) => {
	let avatar;
	arr.forEach((item) => {
		if (item.name === u) {
			avatar = item.avatar;
		}
	});
	return avatar;
};

const Chatbox = (props) => {
	const context = useContext(ModeContext);

	const data = useSelector((state) => state.user)
	const dispatch = useDispatch();
	const msg = useSelector((state) => state.message);
	const [Url, setUrl] = useState("");

	useEffect(() => {
		if(socket.disconnected) socket.connect()
		socket.emit("USER_CONNECTED", data.user.name);
		//console.log('disconnected : ' , socket.disconnected);
		socket.on("FETCH_MESSAGE", (result) => {
			//console.log("Message fetched ", result);
			dispatch(fetchAllMessage(result))
		});
		return () => {
			socket.disconnect()
		}
	// eslint-disable-next-line
	}, [data]);

	useEffect(() => {
		console.log("MEsssage from  redux ", msg);
	}, [msg]);





	const [state, setstate] = useState('')
	const handleChange  = (e) => {
		e.preventDefault()
		setstate(e.target.value)
	  };
	const handleSubmission  = (e) => {
		e.preventDefault()
		if (state !== '') {
			// Create a new date
			const date = new Date()
			// Format : yy mm dd | hh : mn
			const dateString = `${days[date.getDay()]}-${months[date.getMonth()]}-${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`
			//console.log('date' , dateString);
			socket.emit('SEND_MESSAGE' , {
				user : msg.user ,
				friend :  msg.friend,
				id :  nanoid(), 
				content : state ,
				timeStamp : dateString
			} )
			setstate('')
		}
	};


	const AllFriend = useSelector(state => state.friend)
	useEffect(() => {
		const url = server + "/profil/" + correctAvatar(AllFriend, msg.friend);
		setUrl(url)
		// eslint-disable-next-line
	}, [msg])




	/*useEffect(() => {
		if (data === undefined) {
			const fromLocalStorage = 
		}
	}, [])*/



	return (
		<Container
			className=""
			style={{ backgroundColor: context.bg, color: context.color }}
		>
			<div className="setting">
				<SettingMenu setstate={props.setstate} />
			</div>
			<Row>
				<Col lg={5} className='me-4' >
					<ChatMenu />
				</Col>
				<Col>
					<Container
						fluid
						className="shadow p-3 header d-flex justify-content-between bg-primary"
					>
						<div className="d-flex">
							<Image
								src={Url}
								style={{ width: "45px", height: "45px", borderRadius: "50%" }}
							/>
							<div className="d-flex flex-column ps-3">
								<h5 className="text-white">  {msg.friend} </h5>
							</div>
						</div>

						<Menu />
					</Container>
					
					<Container fluid className="body overflow-auto my-2 py-3">
						<ul >
							<Message setUrl={setUrl} />
						</ul>
					</Container>
					<Container
						fluid
						className="shadow footer border border-2 border-primary"
					>
						<Form className="d-flex pt-2" onSubmit={handleSubmission}>
							<Form.Control
								as="textarea"
								placeholder="Type your message here"
								className={context.dark ? "pl-dark" : null}
								value={state}
								name='content'
								onChange={handleChange}
							/>
							<div>
								<Button
									type='submit'
									className="ms-2 mt-2"
									variant="white"
									
								>
									<RiNavigationFill
										color="blue"
										style={{ width: "30px", height: "30px" }}
									/>
								</Button>
							</div>
						</Form>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default Chatbox;
