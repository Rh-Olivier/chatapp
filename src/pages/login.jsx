import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import postNewAccount from "../api/create-new-account";
import login_process from "../api/login-api";
import "../css/login.css";
import { addUser } from "../data/userSlice";

const Login = () => {
	const dispatch = useDispatch()
	const [login, setlogin] = useState(true);
	const [showPassword, setshowPassword] = useState(false)
	const [authorized, setauthorized] = useState(false)

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
		result.then((res) => {
			if (!res.data.hasOwnProperty('err')) {
				dispatch(addUser(res.data))
				setauthorized(true)
			}
		}).catch((err) => console.log(err));
	};











	const handleLoginSubmission = (e) => {
		e.preventDefault();
		const result = login_process(info.email, info.password);
		result.then((res) => {
			if (!res.data.hasOwnProperty('err')) {
				dispatch(addUser(res.data))
				let jsonData = JSON.stringify(res.data);
				localStorage.setItem(`${res.data.name}` , jsonData)
				setauthorized(true)
			}
		}).catch((err) => console.log(err));
	};







	

	if (authorized) return <Redirect to='/home' />
	if (login) {
		return (
			<Container fluid>
				<Row>
					<Col className="welcome">
						<h1 className="display-1">Welcome</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
							Nullam quis semper dolor. Nunc purus nisi, elementum id p
						</p>
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
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type={showPassword ? 'text' : "password"}
									name="password"
									onChange={handleChange}
									placeholder="Password"
								/>
								{showPassword ? 
								<RiEyeCloseFill onClick={() => setshowPassword(!showPassword)} className='password-login' /> :
								 <RiEyeFill className='password-login'  onClick={() => setshowPassword(!showPassword)}  />}
							
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
				<Row>
					<Col className="welcome">
						<h1 className="display-1">Register</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
							Nullam quis semper dolor. Nunc purus nisi, elementum id p
						</p>
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
									type={showPassword ? 'text' : "password"}
									placeholder="Password"
									name="password"
									onChange={handleChange}
								/>
								
								{showPassword ? 
								<RiEyeCloseFill onClick={() => setshowPassword(!showPassword)} className='password' /> :
								 <RiEyeFill className='password'  onClick={() => setshowPassword(!showPassword)}  />}
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
			</Container>
		);
	}
};

export default Login;
