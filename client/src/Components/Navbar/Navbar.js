import { React, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const logout = () => {
		dispatch({ type: "LOG_OUT" });
		setUser(null);
		history.push("/");
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);
	return (
		<div>
			<Row className="navRow">
				<Link to="/">
					<h4>SongUp</h4>
				</Link>
				{!user ? (
					<Link to="/auth">
						<Button className="authButton" variant="primary ">
							{!user && "Sign In"}
						</Button>
					</Link>
				) : (
					<>
						<div className="userInfo">
							<Link to="/profile">
								<p className=" mb-0">Welcome</p>
								<h5 className=""> {user?.result.name}</h5>
							</Link>
						</div>
						<Button className="authButton" variant="danger" onClick={logout}>
							{"Log Out"}
						</Button>
					</>
				)}
			</Row>
		</div>
	);
};

export default Navbar;
