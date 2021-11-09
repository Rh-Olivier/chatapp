import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import postNewAccount from "../api/create-new-account";
import login_process from "../api/login-api";
import "../css/login.css";
import { addUser } from "../data/userSlice";
import Bg from "../assets/path857.png";
import Bg2 from "../assets/path960.png";
import Bg3 from "../assets/path857.png";
import Bg5 from "../assets/bg5.png";



const Login = () => {
	const dispatch = useDispatch();
	const [login, setlogin] = useState(true);
	const [showPassword, setshowPassword] = useState(false);
	const [authorized, setauthorized] = useState(false);

	const [info, setinfo] = useState({
		name: "",
		password: "",
		email: "",
	});
	const handleChange = (e) => {
		e.preventDefault();
		setinfo({
			...info,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateSubmission = (e) => {
		e.preventDefault();
		const result = postNewAccount(info.name, info.password, info.email);
		result
			.then((res) => {
				if (!res.data.hasOwnProperty("err")) {
					dispatch(addUser(res.data));
					let jsonData = JSON.stringify(res.data);
					localStorage.setItem(`user`, jsonData);
					setauthorized(true);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleLoginSubmission = (e) => {
		e.preventDefault();
		const result = login_process(info.email, info.password);
		result
			.then((res) => {
				if (!res.data.hasOwnProperty("err")) {
					dispatch(addUser(res.data));
					let jsonData = JSON.stringify(res.data);
					localStorage.setItem(`user`, jsonData);
					setauthorized(true);
				}
			})
			.catch((err) => console.log(err));
	};

	if (authorized) return <Redirect to="/home" />;
	if (login) {
		return (
			<Container fluid>
				<img src={Bg} alt="" className="bg-top" />
				<img src={Bg5} alt="" className="bg-bottom" />
				<Row>
					<Col className="welcome">
						<h1 className="display-1  tracking-in-contract-bck">Welcome</h1>

						<div className=" tracking-in-contract ">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
						</div>
						<div className=" tracking-in-contract ">
							Nullam quis semper dolor. Nunc purus nisi, elementum id p
						</div>
					</Col>
					<Col>
						<Form className="login-box" onSubmit={handleLoginSubmission}>
							<Form.Group controlId="formBasicEmail" className="mb-2">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									name="email"
									onChange={handleChange}
									placeholder="johndoe@gmail.com"
								/>

								<Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={showPassword ? "text" : "password"}
									name="password"
									onChange={handleChange}
									placeholder="Password"
								/>
								{showPassword ? (
									<RiEyeCloseFill
										onClick={() => setshowPassword(!showPassword)}
										className="password-login"
									/>
								) : (
									<RiEyeFill
										className="password-login"
										onClick={() => setshowPassword(!showPassword)}
									/>
								)}
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								className="w-100 mt-4 mb-3"
							>
								Submit
							</Button>
							<Form.Text className="click ">
								or{" "}
								<strong
									className="text-primary"
									onClick={() => setlogin(false)}
								>
									Create one
								</strong>
							</Form.Text>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	} else {
		return (
			<Container fluid>
				<img src={Bg3} alt="" className="bg-top" />
			
				<Row>
					<Col className="welcome">
						<h1 className="display-1  tracking-in-contract-bck">Register</h1>

						<div className="tracking-in-contract ">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
						</div>
						<div className="tracking-in-contract ">
							Nullam quis semper dolor. Nunc purus nisi, elementum id p
						</div>
					</Col>
					<Col>
						<Form className="login-box" onSubmit={handleCreateSubmission}>
							<Form.Group controlId="formBasicEmail" className="mb-2">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="johndoe@gmail.com"
									name="email"
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicName" className="mb-2">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="John Doe"
									name="name"
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									name="password"
									onChange={handleChange}
								/>

								{showPassword ? (
									<RiEyeCloseFill
										onClick={() => setshowPassword(!showPassword)}
										className="password"
									/>
								) : (
									<RiEyeFill
										className="password"
										onClick={() => setshowPassword(!showPassword)}
									/>
								)}
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								className="w-100 mt-4 mb-3"
							>
								Register
							</Button>
							<Form.Text className="click">
								or{" "}
								<strong className="text-primary" onClick={() => setlogin(true)}>
									{" "}
									Have already an account?
								</strong>
							</Form.Text>
						</Form>
					</Col>
				</Row>
					<img src={Bg5} alt="" className="bg-bottom-2" />
			</Container>
		);
	}
};

export default Login;
