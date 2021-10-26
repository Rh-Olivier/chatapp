import React, { useState, useContext } from "react";
import {
	OverlayTrigger,
	Offcanvas,
	Button,
	Image,
	ListGroup,
	Container,
	Form
} from "react-bootstrap";
import {
	RiMoonFill,
	RiSunFill,
	RiSettingsFill,
	RiLogoutCircleFill,
	RiAddCircleFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { ModeContext, themes } from "../context/mode";
import "../css/setting.css";
import { useSelector } from "react-redux";
import server from "../api/config";
import { io } from "socket.io-client";
import { socket } from "../api/socket";

const SettingMenu = (props) => {
	const [show, setshow] = useState(false);
	const context = useContext(ModeContext);
	const data = useSelector((state) => state.user);
	console.log("> redux ", data.user);

	const [dark, setdark] = useState(false);

	const handleContext = (e) => {
		e.preventDefault();
		if (!dark) {
			setdark(true);
			props.setstate(themes.dark);
		} else {
			setdark(false);
			props.setstate(themes.light);
		}
	};
	const darkmode = (
		<div onClick={handleContext} style={{ cursor: "pointer" }}>
			<RiMoonFill color="maroon" /> Active dark mode
		</div>
	);
	const lightmode = (
		<div onClick={handleContext} style={{ cursor: "pointer" }}>
			<RiSunFill color="yellow" /> Active light mode
		</div>
	);
	const style = { backgroundColor: context.bg, color: context.color };


	const handleLogOut = (e) => {
		e.preventDefault();
		console.log("I am log out ", data.user.name);
		socket.emit('LOG_OUT' ,data.user.name)
		socket.disconnect()
		console.log('disconnect : ' ,socket.disconnected);
	};

	return (
		<>
			<Button
				variant={dark ? "light" : "outline-primary"}
				style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
				onClick={() => setshow(true)}
			>
				<RiSettingsFill />
			</Button>
			<Offcanvas show={show} onHide={() => setshow(false)} style={style}>
				<Offcanvas.Header closeButton>
					<Container
						fluid
						className="d-flex justify-content-center align-items-center flex-column"
					>
						<div>
							<div>
								<Image
									src={"http://localhost:5000/profil/" + data.user.avatar}
									className="profil border"
								/>
							</div>

							<OverlayTrigger
								placement="left"
								trigger="click"
								delay={{ show: 250, hide: 400 }}
								overlay={() => (
									<div className="popover">
										<Form
											method="POST"
											action="http://localhost:5000/upload"
											enctype="multipart/form-data"
											className="m-3"
										>
											<Form.Text className="text-warning mb-0">
												<h6>
													The update will display in the <br />
													next log in.Please, log out and <br />
													log in again to see change.
												</h6>
											</Form.Text>
											<Form.Group controlId="formBasicEmail" className="fgroup">
												<Form.Label> </Form.Label>
												<Form.Control type="file" name="avatar" />
												<Form.Control
													name="name"
													type="text"
													className="visually-hidden"
													value={data.user.name}
													readOnly
												/>
												<Button type="submit">ok</Button>
											</Form.Group>
										</Form>
									</div>
								)}
							>
								<RiAddCircleFill className="change-profil" />
							</OverlayTrigger>
						</div>
						<h1 className="display-6 mt-4">{data.user.name}</h1>
					</Container>
				</Offcanvas.Header>
				<Offcanvas.Body className="p-4">
					<ListGroup>
						<ListGroup.Item style={style} className="item">
							{!dark ? darkmode : lightmode}

						</ListGroup.Item>
						<ListGroup.Item style={style} className="item" onClick={handleLogOut}>
							<Link
								to="/"
								style={style}
								className="link"
								
							>
								<RiLogoutCircleFill /> Log out
							</Link>
						</ListGroup.Item>
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default SettingMenu;
