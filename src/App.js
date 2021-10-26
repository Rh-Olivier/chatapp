import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbox from "./pages/chatbox";
import {  Container } from "react-bootstrap";
import { ModeContext, themes } from "./context/mode";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./data/store";


function App(props) {
	const [state, setstate] = useState(themes.light)

	return (
		<Provider store={store}>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/home">
					<ModeContext.Provider value={state}>
							<Container
								style={{ backgroundColor: state.bg, color: state.color }}
								fluid
							>										
								<Chatbox setstate={setstate} />									
							</Container>						
					</ModeContext.Provider>
				</Route>
			</Switch>
		</Provider>
	);
}

export default App;
