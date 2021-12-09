import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import postNewAccount from "../api/create-new-account";
import login_process from "../api/login-api";
import "../css/login.css";
import { addUser } from "../data/userSlice";

import { GiFire } from "react-icons/gi";
import { useFormik } from "formik";
import server from "../api/config";
import axios from "axios";

const validate = (values) => {
	const errors = {};

	const regexEmail = /[A-Z]|[0-9]{5,}@[A-Z]{5,}.com/i;

	if (!regexEmail.test(values.email)) {
		errors.email = "Invalid email";
	}
	if (values.email === "") {
		errors.email = "Required";
	}

	if (values.password === "") {
		errors.password = "Required";
	} else if (values.password.length < 8) {
		errors.password = "Must be 8 characters or more";
	}

	return errors;
};

const validateSignUp = (values) => {
	const errors = {};
	const regexEmail = /[A-Z]|[0-9]{5,}@[A-Z]{5,}.com/i;

	if (!regexEmail.test(values.email)) {
		errors.email = "Invalid email";
	}
	if (values.name === "") {
		errors.name = "Required";
	}
	if (values.email === "") {
		errors.email = "Required";
	}
	if (values.password === "") {
		errors.password = "Required";
	} else if (values.password.length < 8) {
		errors.password = "Must be 8 characters or more";
	}

	return errors;
};

// FUNCTION RETURN TRUE OR FALSE IN CASE OF ERRORS OR NOT
const haveErrors = (onblur, required, wrong) => {
	let error;
	if (onblur && required) {
		error = true;
	} else if (wrong) {
		error = true;
	} else {
		error = false;
	}
	return error;
};

const haveErrorsOnSignUp = (onblur, required, userExist) => {
	let error;
	if (onblur && required) {
		error = true;
	} else if (userExist) {
		error = true;
	} else {
		error = false;
	}
	return error;
};

const Login = () => {
	const dispatch = useDispatch();
	const [login, setlogin] = useState(true);
	const [showPassword, setshowPassword] = useState(false);
	const [authorized, setauthorized] = useState(false);

	const [wrongPassword, setwrongPassword] = useState(false);
	const [userAlreadyExist, setuserAlreadyExist] = useState(false);

	/******* 	BUILDING FORM WITH FORMIK      *****/
	/**************  LOGIN SUBMISSION  *************/
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate,
		onSubmit: (values) => {
			const result = login_process(values.email, values.password);
			result
				.then((res) => {
					// Verify if there is no error
					if (!res.data.hasOwnProperty("err")) {
						// Add the user data in the redux store
						dispatch(addUser(res.data.user));

						// Add the user data to the local storage
						let jsonData = JSON.stringify(res.data.user);
						localStorage.setItem(`user`, jsonData);

						// Add the user token to the local storage
						localStorage.setItem(`token`, res.data.token);

						// Redirect to the main app
						setauthorized(true);

						// If there is an arror
					} else {
						if (res.data.err === "wrong password") {
							setwrongPassword(true);
						}
					}
				})
				.catch((err) => console.log(err));
		},
	});

	/**************  CREATE SUBMISSION  *************/
	const formik2 = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validate: (values) => {
			return validateSignUp(values);
		},
		onSubmit: (values) => {
			const result = postNewAccount(values.name, values.password, values.email);
			result
				.then((res) => {
					if (!res.data.hasOwnProperty("err")) {
						dispatch(addUser(res.data));
						let jsonData = JSON.stringify(res.data);
						localStorage.setItem(`user`, jsonData);
						setauthorized(true);
					} else {
						console.log(res.data);
						if (res.data.err === "User name already taken") {
							setuserAlreadyExist(true);
						}
					}
				})
				.catch((err) => console.log(err));
		},
	});

	const navigate = useNavigate();
	// Made a verification on component mount
	useEffect(() => {
		console.log("component mount");
		console.log(localStorage.getItem("token"));
		axios
			.get(`${server}/verifyToken`, {
				// Allow headers x-access-token
				headers: {
					// Get the 'token' from localStorage
					"x-access-token": localStorage.getItem("token"),
				},
			})
			.then((res) => {
				// Give access if the user is already logged in
				console.log(res.data);
				if (res.data.isLoggedIn) {
					dispatch(addUser(res.data.user));
					navigate("/home/friend");
				}
			})
			.catch((err) => console.error(err));
		// eslint-disable-next-line
	}, []);

	if (authorized) navigate("/home/friend");
	if (login) {
		return (
			<Container fluid>
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
						<Form className="login-box" onSubmit={formik.handleSubmit}>
							<div className="login-logo d-flex flex-column justify-content-center align-items-center">
								<GiFire style={{ fontSize: "60px" }} />
							</div>
							<Form.Text className="display-2 mb-2">
								<h1>Login</h1>
							</Form.Text>

							<Form.Group controlId="formBasicEmail" className="mb-2">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									name="email"
									onChange={formik.handleChange}
									value={formik.values.email}
									onBlur={formik.handleBlur}
									placeholder="johndoe@gmail.com"
									className={
										formik.touched.email && formik.errors.email
											? "border-danger"
											: null
									}
								/>
								{formik.touched.email && formik.errors.email ? (
									<small className="text-danger">
										{formik.errors.email}
										<br />
									</small>
								) : null}

								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Label>Password</Form.Label>
								<div className="d-flex control-input">
									<Form.Control
										type={showPassword ? "text" : "password"}
										name="password"
										onChange={formik.handleChange}
										value={formik.values.password}
										onBlur={formik.handleBlur}
										onBeforeInput={() => setwrongPassword(false)}
										placeholder="Password"
										className={
											haveErrors(
												formik.touched.password,
												formik.errors.password,
												wrongPassword
											)
												? "border-danger"
												: null
										}
									/>
									{!showPassword ? (
										<RiEyeCloseFill
											className="password-login"
											onClick={() => setshowPassword(!showPassword)}
										/>
									) : (
										<RiEyeFill
											className="password-login"
											onClick={() => setshowPassword(!showPassword)}
										/>
									)}
								</div>

								{formik.touched.password && formik.errors.password ? (
									<small className="text-danger">
										{formik.errors.password}
										<br />
									</small>
								) : null}

								{wrongPassword ? (
									<small className="text-danger">
										Password incorrect
										<br />
									</small>
								) : null}
							</Form.Group>
							<Button
								variant="primary"
								type="submit"
								className="w-100 mt-4 mb-3"
							>
								Log in
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
						<h1 className="display-1  tracking-in-contract-bck">Register</h1>

						<div className="tracking-in-contract ">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
						</div>
						<div className="tracking-in-contract ">
							Nullam quis semper dolor. Nunc purus nisi, elementum id p
						</div>
					</Col>
					<Col>
						<Form className="login-box" onSubmit={formik2.handleSubmit}>
							<Form.Group controlId="formBasicEmail" className="mb-2">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="johndoe@gmail.com"
									name="email"
									onChange={formik2.handleChange}
									value={formik2.values.email}
									onBlur={formik2.handleBlur}
									className={
										formik2.touched.email && formik2.errors.email
											? "border-danger"
											: null
									}
								/>
								{formik2.touched.email && formik2.errors.email ? (
									<small className="text-danger">
										{formik2.errors.email}
										<br />
									</small>
								) : null}
							</Form.Group>
							<Form.Group controlId="formBasicName" className="mb-2">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="John Doe"
									name="name"
									onChange={formik2.handleChange}
									value={formik2.values.name}
									onBlur={formik2.handleBlur}
									onBeforeInput={() => setuserAlreadyExist(false)}
									className={
										haveErrorsOnSignUp(
											formik2.touched.name,
											formik2.errors.name,
											userAlreadyExist
										)
											? "border-danger"
											: null
									}
								/>
								{formik2.touched.name && formik2.errors.name ? (
									<small className="text-danger">
										{formik2.errors.name}
										<br />
									</small>
								) : null}
								{userAlreadyExist ? (
									<small className="text-danger">
										User already taken
										<br />
									</small>
								) : null}
							</Form.Group>
							<Form.Group controlId="formBasicPassword" className="mb-2">
								<Form.Label>Password</Form.Label>
								<div className="d-flex control-input">
									<Form.Control
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										name="password"
										onChange={formik2.handleChange}
										value={formik2.values.password}
										onBlur={formik2.handleBlur}
										className={
											formik2.touched.password && formik2.errors.password
												? "border-danger"
												: null
										}
									/>
									{!showPassword ? (
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
								</div>

								{formik2.touched.password && formik2.errors.password ? (
									<small className="text-danger">
										{formik2.errors.password}
										<br />
									</small>
								) : null}
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
