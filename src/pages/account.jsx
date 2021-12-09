import { useState } from "react";
import { Form, Button, Container, Alert, Accordion } from "react-bootstrap";
import { RiEyeCloseFill, RiEyeFill, RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import "../css/account.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { addUser } from "../data/userSlice";
import server from "../api/config";
import { fetchAllMessage } from "../data/allmessageSlice";
import { deleteAccount } from "../api/delete";

const Account = () => {
	const [showPassword, setshowPassword] = useState(false);

	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	const [info, setinfo] = useState({
		name: user.name,
		password: user.password,
		email: user.email,
	});
	const handleChange = (e) => {
		e.preventDefault();
		setinfo({
			...info,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeSubmission = (e) => {
		e.preventDefault();
		axios
			.put(server + "/update-account", {
				oldname: user.name,
				name: info.name,
				email: info.email,
				password: info.password,
			})
			.then((update) => {
				console.log(update.data);
				dispatch(addUser(update.data.user));
				dispatch(fetchAllMessage(update.data.messages));
				navigate("/home/friend");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const navigate = useNavigate();
	const goBack = () => {
		navigate("/home/friend");
	};

	const handleDeletion = () => {
		deleteAccount(info.name, user.avatar)
			.then((result) => {
				if (result.message === "deleted") {
					navigate("/");
				}
			})
			.catch((err) => {
				alert("Error");
			});
	};
	return (
		<Container className="fade-anim outer-container-form-account" fluid>
			<div className="navigation d-flex justify-content-start ps-1">
				<RiArrowLeftLine
					className="back-account ms-2 me-4"
					onClick={() => goBack()}
				/>
				<h4 className="">Account</h4>
			</div>
			<Accordion defaultActiveKey="0" className="accordion-position">
				<Accordion.Item eventKey="0">
					<Accordion.Header className="">Change name</Accordion.Header>
					<Accordion.Body className="">
						<Form className="" onSubmit={handleChangeSubmission}>
							<Form.Group controlId="formBasicName" className="mb-3">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="John Doe"
									name="name"
									onChange={handleChange}
									value={info.name}
								/>
							</Form.Group>

							<div className="btn-container">
								<Button type="submit" className="w-100 mt-4 mb-3 button">
									Save change
								</Button>
							</div>
						</Form>
					</Accordion.Body>
				</Accordion.Item>

				<Accordion.Item eventKey="1">
					<Accordion.Header className="">Change email</Accordion.Header>
					<Accordion.Body className="">
						<Form className="" onSubmit={handleChangeSubmission}>
							<Form.Group controlId="formBasicEmail" className="mb-3">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="johndoe@gmail.com"
									name="email"
									onChange={handleChange}
									value={info.email}
								/>
							</Form.Group>

							<div className="btn-container">
								<Button type="submit" className="w-100 mt-4 mb-3 button">
									Save change
								</Button>
							</div>
						</Form>
					</Accordion.Body>
				</Accordion.Item>

				<Accordion.Item eventKey="2">
					<Accordion.Header className="">Change password</Accordion.Header>
					<Accordion.Body className="">
						<Form className="" onSubmit={handleChangeSubmission}>
							<Form.Group controlId="formBasicPassword" className="mb-3">
								<Form.Label>Password</Form.Label>
								<div className="d-flex">
									<Form.Control
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										name="password"
										onChange={handleChange}
										value={info.password}
									/>

									{!showPassword ? (
										<RiEyeCloseFill
											onClick={() => setshowPassword(!showPassword)}
											className="passwd-account"
										/>
									) : (
										<RiEyeFill
											className="passwd-account"
											onClick={() => setshowPassword(!showPassword)}
										/>
									)}
								</div>
							</Form.Group>
							<div className="btn-container">
								<Button type="submit" className="w-100 mt-4 mb-3 button">
									Save change
								</Button>
							</div>
						</Form>
					</Accordion.Body>
				</Accordion.Item>

				<Accordion.Item eventKey="3">
					<Accordion.Header>Remove my account</Accordion.Header>
					<Accordion.Body>
						<Alert variant="danger">
							<h6>Do you really want to leave us ?</h6>
							<div className="d-flex justify-content-end">
								<Button variant="danger" onClick={() => handleDeletion()}>
									Delete
								</Button>
							</div>
						</Alert>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
};

export default Account;
