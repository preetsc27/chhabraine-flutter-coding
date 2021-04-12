import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import Formcomp from "./FormComp";
import "./Sign.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth.js";

const initialData = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	confirmpassword: "",
};

const Sign = () => {
	const [authData, setAuthData] = useState(initialData);

	const dispatch = useDispatch();
	const history = useHistory();

	const [isSignUp, setIsSignUp] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	const handlePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
		console.log(showPassword);
	};
	const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

	const handleSubmit = (e) => {
		if (isSignUp) {
			e.preventDefault();
			dispatch(signUp(authData, history));
		} else {
			e.preventDefault();
			dispatch(signIn(authData, history));
		}
	};
	const handleChange = (e) => {
		setAuthData({ ...authData, [e.target.name]: e.target.value });
	};

	return (
		<Row className="auth">
			<div className="formCont">
				<Form onSubmit={handleSubmit}>
					{isSignUp && (
						<Form.Row>
							<Col>
								<Formcomp
									title="First Name"
									name="firstname"
									handleChange={handleChange}
								/>
							</Col>
							<Col>
								<Formcomp
									title="Last Name"
									name="lastname"
									handleChange={handleChange}
								/>
							</Col>
						</Form.Row>
					)}

					<Formcomp title="Email" name="email" handleChange={handleChange} />
					<Formcomp
						title="Password"
						name="password"
						handleChange={handleChange}
						handlePassword={handlePassword}
						type={showPassword ? "text" : "password"}
					/>
					{isSignUp && (
						<Formcomp
							title="Confirm Password"
							name="comfirmpassword"
							handleChange={handleChange}
						/>
					)}

					<Button type="submit" variant="primary">
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					{isSignUp ? (
						<h6>
							Already have an account ?{" "}
							<a onClick={switchMode} style={{ color: "blue" }}>
								Sign In
							</a>
						</h6>
					) : (
						<h6>
							Don't have an account ?{" "}
							<a onClick={switchMode} style={{ color: "blue" }}>
								Sign Up
							</a>
						</h6>
					)}
				</Form>
			</div>
		</Row>
	);
};

export default Sign;
