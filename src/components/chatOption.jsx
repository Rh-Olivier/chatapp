import React, { PureComponent } from "react";
import {
	OverlayTrigger,
	Popover,
	Button,
	ListGroup,
	Image,
} from "react-bootstrap";
import { RiMenu3Line, RiDeleteBin5Fill } from "react-icons/ri";


const Menu = () => {
	return (
		<OverlayTrigger
			trigger="click"
			placement="left-start"
			overlay={
				<Popover id="popover-menu">
					<p>
						<ListGroup>
							<ListGroup.Item>
								<RiDeleteBin5Fill color="#c00" /> Delete this message
							</ListGroup.Item>
						</ListGroup>
					</p>
				</Popover>
			}
		>
			<Button variant="white">
				<RiMenu3Line color="white" style={{ width: "25px", height: "25px" }} />
			</Button>
		</OverlayTrigger>
	);
};

export default Menu;
