import React, { useContext } from "react";
import { Image, Container, Row, Col, ListGroupItem } from "react-bootstrap";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { ModeContext } from "../context/mode";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../data/messageSlice";
import new_interaction from "../api/new-interaction";
import { addOneMessage } from "../data/allmessageSlice";

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
	const dispatch = useDispatch()


	const actifStatus = (
		<RiCheckboxBlankCircleFill
			className="actif-status border"
			color={find(props.actif, props.user.name) ? "#0f0" : "#dc143c"}
		/>
	);


	const user = useSelector(state => state.user.user.name)
	//const state = useSelector(state => state)
	//console.log('redux state ' , state);
	const allMessage = useSelector(state => state.allMessage)
	const handleCurrentMessage = (e) => {
		e.preventDefault();
		const currentOne = allMessage.find( item => item.friend === props.user.name)
		if (currentOne === undefined) {
			new_interaction(user , props.user.name)
			.then((result) => {
				console.log('new inter ' ,result);
				dispatch(addOneMessage(result.data))
				dispatch(addMessage(result.data))
				console.log('all msg update'  , allMessage);
			}).catch((err) => {
				console.log('new inter err ' ,err);
			});
		} else {
			console.log('dispatching... ');
			dispatch(addMessage(currentOne))
		}
		
	};

	return (
		<ListGroupItem
			action
			className="mb-1 shadow-sm border-1 listItem"
			style={{
				backgroundColor: context.bg,
				color: context.color,
				
			}}
			onClick={handleCurrentMessage}
		>
			<Row>
				<Col lg="4">
					<Image
						src={"http://localhost:5000/profil/" + props.user.avatar}
						className="pdp rounded-circle border"
					/>
					{actifStatus}
				</Col>
				<Col className='userInfo' >
					<Container
						fluid
						className="d-flex flex-column"
						style={{ position: "relative", right: "2rem" }}
					>
						<div className="text-primary">{props.user.name}</div>
						
					</Container>
				</Col>
			</Row>
		</ListGroupItem>
	);
};

export default Userbox;
