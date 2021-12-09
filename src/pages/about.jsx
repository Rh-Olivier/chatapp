import { Form, Button, Container, Accordion } from "react-bootstrap";
import {  RiArrowLeftLine ,RiCopyrightLine } from "react-icons/ri";
import { GiFire } from "react-icons/gi";

import "../css/about.css";
import { useNavigate } from "react-router";

const About = () => {
	

	const navigate = useNavigate();
	const goBack = () => {
		navigate("/home/friend");
	};
	return (
		<Container className="fade-anim outer-container-form-account" fluid>
			<div className="navigation d-flex justify-content-start ps-1">
				<RiArrowLeftLine
					className="back-account ms-2 me-4"
					onClick={() => goBack()}
				/>
				<h4 className="">About</h4>
			</div>
            <div className="d-flex flex-column justify-content-center align-items-center about-position">
                <div className='my-4'>
                    <GiFire style={{fontSize:'90px'}}/>
                </div>
                <div >
                    <h3>Fire chat</h3>
                    <p>Version : 0.0.2</p>
                    
                </div>
                <div className='small text-center'>
                    Copyright <RiCopyrightLine /> 2021 Olivier <br />
                    All right reserved
                </div>
            </div>
			
		</Container>
	);
};

export default About;
