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
import { addMessage } from "../data/messageSlice";

const Menu = () => {
	const message = useSelector(state => state.message)
	const dispatch = useDispatch()
	

	const handleDeletion = e => {
		e.preventDefault()
		deleteMessage(message.user , message.friend)
			.then((result) => {
				//console.log(result);
				dispatch(updateOneMessage(result))
				dispatch(addMessage(result))
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
					<h4>Setting</h4>
					<p>
						<ListGroup >
							<ListGroup.Item action onClick={handleDeletion} className='border-0 ps-1'>
								<RiDeleteBin5Fill color="#c00" className='ri-1' /> Delete this message
							</ListGroup.Item>
						</ListGroup>
					</p>
				</Popover>
			}
		>
			<Button variant="white"  >
				<RiMenu3Line color="white" style={{ width: "23px", height: "23px" }} />
			</Button>
		</OverlayTrigger>
	);
};

export default Menu;
