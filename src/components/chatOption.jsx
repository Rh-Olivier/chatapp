import React from "react";
import {
	OverlayTrigger,
	Popover,
	Button,
	ListGroup
} from "react-bootstrap";
import { RiMenu3Line, RiDeleteBin5Fill } from "react-icons/ri";
import {  useDispatch, useSelector } from "react-redux";
import deleteMessage from "../api/delete";
import { updateOneMessage } from "../data/allmessageSlice";

const Menu = () => {
	const message = useSelector(state => state.message)
	const dispatch = useDispatch()
	

	const handleDeletion = e => {
		e.preventDefault()
		deleteMessage(message.user , message.friend)
			.then((result) => {
				console.log(result);
				dispatch(updateOneMessage(result))
			}).catch((err) => {
				console.log(err);
			});
	}
	return (
		<OverlayTrigger
			trigger="click"
			placement="left-start"
			overlay={
				<Popover id="popover-menu">
					<p>
						<ListGroup>
							<ListGroup.Item action onClick={handleDeletion}>
								<RiDeleteBin5Fill color="#c00" /> Delete this message
							</ListGroup.Item>
						</ListGroup>
					</p>
				</Popover>
			}
		>
			<Button variant="white" >
				<RiMenu3Line color="white" style={{ width: "25px", height: "25px" }} />
			</Button>
		</OverlayTrigger>
	);
};

export default Menu;
