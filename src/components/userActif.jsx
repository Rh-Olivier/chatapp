import React, { useContext, useState, useEffect } from "react";
import {
	Image,
	Container,
	Row,
	Col,
	Badge
} from "react-bootstrap";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { ModeContext } from "../context/mode";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../data/messageSlice";
import new_interaction from "../api/new-interaction";
import { addOneMessage, updateOneMessage } from "../data/allmessageSlice";
import seenUpdate from "../api/seen";
import { useNavigate } from "react-router-dom";


const find = (ar, u) => {
	let isActif = false;
	ar.forEach((element) => {
		if (element === u) {
			isActif = true;
		}
	});
	return isActif;
};

const Userbox = (props) => {
	const context = useContext(ModeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const actifStatus = (
		<RiCheckboxBlankCircleFill
			className="actif-status border"
			color={find(props.actif, props.user.name) ? "#0f0" : "#dc143c"}
		/>
	);

	const user = useSelector((state) => state.user.user.name);
	//const state = useSelector(state => state)
	//console.log('redux state ' , state);

	// ALL MESSAGES IN THE REDUX STORE
	const allMessage = useSelector((state) => state.allMessage);

	// MATCH THE FRIEND NAME AND THE MESSAGE 'BADGE'
	const [seen, setseen] = useState();

	const alertNewMessage = () => {
		const currentOne = allMessage.find(
			(item) => item.friend === props.user.name
		);
		if (currentOne !== undefined) setseen(currentOne.seen);
	};
	useEffect(() => {
		alertNewMessage();
		// eslint-disable-next-line
	}, [allMessage]);

	const handleCurrentMessage = (e) => {
		e.preventDefault();
		const currentOne = allMessage.find(
			(item) => item.friend === props.user.name
		);
		if (currentOne === undefined) {
			new_interaction(user, props.user.name)
				.then((result) => {
					//console.log('new inter ' ,result);
					dispatch(addOneMessage(result.data));
					dispatch(addMessage(result.data));

					
					//console.log('all msg update'  , allMessage);
				})
				.catch((err) => {
					console.log("new inter err ", err);
				});
		} else {
			
			// SEND REQUEST TO THE SERVER TO TELL THAT THE CURRENT
			// MESSAGE WAS SEEN BY THE USER
			seenUpdate(user, props.user.name)
				.then((result) => {
					// UPDATE THE ALL MESSAGE REDUX
					dispatch(updateOneMessage(result));

					// ADD THE NEW MSG TO THE UI
					dispatch(addMessage(result));

					// NAVIGATE TO THE MATCHING MESSAGE
					navigate('/home/message')
				})
				.catch((err) => {
					console.log("error while update seen", err);
				});

			//console.log('alert new msg ' , alertNewMessage());
		}
	};


	return (
		<div
			
			className="mb-1 shadow-sm listItem p-2"
			style={{
				backgroundColor: context.bg,
				color: context.color,
			}}
			onClick={handleCurrentMessage}
		>
			<Row>
				<Col className=''>
					<div className="pdp-container">
						<Image
							src={"http://localhost:5000/profil/" + props.user.avatar}
							className="pdp rounded-circle border"
						/>
					</div>

					{actifStatus}
				</Col>
				<Col className="userInfo" xs={5} >
					
						<div style={{ color: context.color }} >{props.user.name}</div>
					
				</Col>
				<Col  className=''>
					{seen ? null : (
						<Badge bg="info" className="notification-badge">
							new
						</Badge>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default Userbox;
