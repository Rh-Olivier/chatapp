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
	RiMoonFill,RiInstagramFill,RiUploadCloud2Fill,
	RiSunFill,
	RiSettingsFill,
	RiLogoutCircleFill,
	RiAddCircleFill,RiFacebookCircleFill ,RiGithubFill, RiGoogleFill
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { ModeContext, themes } from "../context/mode";
import "../css/setting.css";
import { useDispatch, useSelector } from "react-redux";
import server from "../api/config";
//import { io } from "socket.io-client";
import { socket } from "../api/socket";
import axios from "axios";
import { addUser } from "../data/userSlice";





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
			<RiMoonFill color="maroon" className='ri'  /> Enable dark mode
		</div>
	);
	const lightmode = (
		<div onClick={handleContext} style={{ cursor: "pointer" }}>
			<RiSunFill color="yellow"   className='ri'  /> Disable light mode
		</div>
	);
	const style = { backgroundColor: context.bg, color: context.color };


	const handleLogOut = (e) => {
		e.preventDefault();
		console.log("I am log out ", data.user.name);
		socket.emit('LOG_OUT' ,data.user.name)
		
		// Remove the user data from localStorage 
		localStorage.removeItem('user')

		// Disconnect the socket.ionn
		socket.disconnect()
		console.log('disconnect : ' ,socket.disconnected);
	};


	// HANDLE THE UPLOADING PROCESS :
	const dispatch = useDispatch()

	// STATE FOR SELECTED FILES
	const [selectedFiles, setselectedFiles] = useState(undefined)

	// HANDLE THE FILE SELECTED
	const selectFile = e => setselectedFiles(e.target.files)
	//console.log('selectedFiles ', selectedFiles);

	const handleUpload  = async (e) => {
		try {
			e.preventDefault()
			const currentFile = selectedFiles[0]
			let formData = new FormData()
			formData.append('avatar' , currentFile)
			console.log(formData);
			const result = await axios.post(`${server}/upload/${data.user.name}` , formData  , {
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			})
			dispatch(addUser(result.data));
			//console.log('upload ' , result);
		} catch (error) {
			console.log(error);
		}
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
							<div className='profil-container'>
								<Image
									src={"http://localhost:5000/profil/" + data.user.avatar}
									className="profil border"
									alt={data.user.name}
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
											enctype="multipart/form-data"
											className="p-2 border"
											onSubmit={handleUpload}
										>
											
											<Form.Group controlId="formBasicEmail" className="d-flex">
												
												<Form.Control type="file" onChange={selectFile} />
											
												<Button className='ms-1' type="submit" variant='outline-primary'>
													<RiUploadCloud2Fill style={{fontSize:"20px"}} />
												</Button>
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
				<Offcanvas.Body className="m-3 mt-0 ">
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
								<RiLogoutCircleFill  className='ri'  /> Log out
							</Link>
						</ListGroup.Item>
					</ListGroup>
					<Container className='author small'>
						
						Chat app v0.0.2 <br />
						RASOLOMANANA Herimanitra Olivier <br />
						<div className="d-flex justify-content-around mt-3">
							<Link to="" target='_blank'><RiFacebookCircleFill style={{fontSize:"25px"}} /></Link>
							<Link to="" target='_blank'><RiGithubFill color='black' style={{fontSize:"25px"}}/></Link>
							<Link to="" target='_blank'><RiInstagramFill color='blue' style={{fontSize:"25px"}}/></Link>
							<Link to="" target='_blank'><RiGoogleFill color='black' style={{fontSize:"25px"}}/></Link>
						</div>
					</Container>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default SettingMenu;
