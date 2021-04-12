import "./App.css";
import React from "react";
import Home from "./Components/Homepage/Home";
import Sign from "./Components/Auth/Sign";
import Profile from "./Components/Profile/Profile";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/auth">
						<Sign />
					</Route>

					<Route exact path="/profile">
						<Profile />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
