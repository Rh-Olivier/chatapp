import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
	ListGroup,
	Button,
	Container,
	Col,
	Row,
	Form,
	OverlayTrigger,
} from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import { ModeContext } from "../context/mode";
import Userbox from "./userActif";
import server from "../api/config";
import { useDispatch, useSelector } from "react-redux";
import { allFriend } from "../data/friendsSlice";
import { nanoid } from "@reduxjs/toolkit";
import socketClient from "socket.io-client";
import { socket } from "../api/socket";
import "../css/suggestion.css";
import findOneUser from "../api/find";

const fetchUsers = async () => {
	try {
		const result = await axios.get(server + "/all-user");
		return result.data;
		/*result
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(err);
			});*/
	} catch (error) {
		console.log(error);
	}
};

const ChatMenu = () => {
	//const [show, setshow] = useState(false);
	const context = useContext(ModeContext);
	const [users, setusers] = useState([]);

	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchUsers()
			.then((result) => {
				let result_filtered = result.map((item) => {
					if (item.name !== user.user.name) {
						return item;
					}
				});

				setusers(result_filtered);
				dispatch(allFriend(result));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch]);

	const [actifList, setactifList] = useState([]);
	useEffect(() => {
		//console.log(" actif list", actifList);
	}, [actifList]);

	/*const value = useContext(ActifContext)
	console.log(value);*/
	const Server = socketClient(server);

	Server.on("connect", () => {
		Server.on("ONLINE_USERS", (actif) => {
			/*if (actifList.length === 0) {
				console.log('actif = ' , actif);
				setactifList([...actif])			
				console.log('update ' , actifList);
			} else {*/
			for (let index = 0; index < actif.length; index++) {
				const element = actif[index];
				let isAlreadyHere = false;
				for (let j = 0; j < actifList.length; j++) {
					const el = actifList[j];
					if (el === element) isAlreadyHere = true;
				}
				if (!isAlreadyHere) {
					let update = actifList;
					update.push(element);
					setactifList([...update]);
					//console.log("after update", actifList);
				}
			}
			//}
		});

		Server.on("OFFLINE_USERS", (actif) => {
			//console.log("offline ", actif);
			setactifList([...actif]);
		});
	});

	const [search, setSearch] = useState("");
	const [suggestion, setsuggestion] = useState([]);
	// CONTROL THE SEARCH BAR
	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	// ERROR NOT FOUND
	const [show, setshow] = useState(false);

	// SEARCH ENGINE
	const handleSearch = async (e) => {
		e.preventDefault();
		if (search !== "") {
			const result = await findOneUser(search);

			if (result.hasOwnProperty("err")) {
				//console.log('not found');
				setshow(true);
				setTimeout(() => {
					setshow(false);
				}, 3000);
			} else {
				setshow(false);
				setusers([result]);
			}
		}
	};

	useEffect(() => {
		if (search !== "") {
			socket.on("disconnect", () => {
				socket.connect();
			});
			socket.emit("SEARCH", search, socket.id);
			//console.log(socket.id);
			socket.on(`${socket.id}`, (result) => {
				setsuggestion(result);
			});
		} else {
			setsuggestion([]);
		}
	}, [search]);

	return (
		<Container
			fluid
			className="chatmenu-innercontainer "
			style={{ backgroundColor: context.bg, color: context.color }}
		>
			<Row className=" header">
				<Col className="pt-3">
					<OverlayTrigger
						trigger="click"
						placement="bottom-start"
						overlay={
							<ListGroup className="suggestion-container">
								{suggestion.map((item) => {
									return (
										<ListGroup.Item action onClick={() => setSearch(item)}>
											{item}
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						}
					>
						<Form
							className="d-flex justify-content-around"
							onSubmit={handleSearch}
						>
							<Form.Control
								type="text"
								placeholder="Search"
								className={context.dark ? "pl-dark" : null}
								value={search}
								onChange={handleChange}
							/>
							<Button
								className="ms-2"
								variant={context.dark ? "light" : "white"}
								type="submit"
							>
								<RiSearch2Line />
							</Button>
						</Form>
					</OverlayTrigger>
				</Col>
				<p className={show ? "text-danger small" : "visually-hidden"}>
					{" "}
					Ooops! not found{" "}
				</p>
			</Row>
			<Row className="ps-1 list-container">
				<ListGroup className="body-friend position overflow p-2 ">
					{users.map((user) => {
						return <Userbox key={nanoid()} user={user} actif={actifList} />;
					})}
				</ListGroup>
			</Row>
		</Container>
	);
};

export default ChatMenu;
