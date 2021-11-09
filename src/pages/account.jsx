import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { RiEyeCloseFill, RiEyeFill,RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import '../css/account.css'
import { useNavigate } from "react-router";
import axios from "axios";
import { addUser } from "../data/userSlice";
import server from "../api/config";


const Account = () => {
	const [showPassword, setshowPassword] = useState(false);

	const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()

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
        axios.put(server+'/update-account' , {
            oldname : user.name,
            name : info.name ,
			email : info.email ,
			password : info.password
        })
            .then((update) => {
                console.log(update.data);
                dispatch(addUser(update.data))
                navigate('/home/friend')
            }).catch((err) => {
                console.log(err);
            });
	};

    const navigate = useNavigate()
    const goBack  = () => {
		navigate('/home/friend')
	};
	return (
		<Container className="fade-anim outer-container-form-account" fluid>
            <RiArrowLeftLine className='back' onClick={() => goBack()}/>
			<Form
				className="container-account-form shadow"
				onSubmit={handleChangeSubmission}
			>
				<Form.Text>
					<h4 className="header-form-account">Update my info</h4>
				</Form.Text>
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
				<Form.Group controlId="formBasicPassword" className="mb-3">
					<Form.Label>Password</Form.Label>
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
							className="password-account"
						/>
					) : (
						<RiEyeFill
							className="password-account"
							onClick={() => setshowPassword(!showPassword)}
						/>
					)}
				</Form.Group>
				<div className="btn-container">
                    
						<Button  type="submit" className="w-100 mt-4 mb-3 button">
							Save change
						</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Account;
