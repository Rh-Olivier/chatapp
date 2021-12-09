import React, { useState} from "react";
import "./css/style.css"
import Chatbox from "./pages/chatbox";
import {  Container } from "react-bootstrap";
import { ModeContext, themes } from "./context/mode";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./data/store";


function App(props) {
	const [state, setstate] = useState(themes.light)

	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Login />} />
					
				<Route path="home/*" element={
					<ModeContext.Provider value={state}>
							<Container
								style={{ backgroundColor: state.bg, color: state.color }}
								fluid
							>										
								<Chatbox setstate={setstate} />									
							</Container>						
					</ModeContext.Provider>
				}>
					
				</Route>
			</Routes>
		</Provider>
	);
}

export default App;
