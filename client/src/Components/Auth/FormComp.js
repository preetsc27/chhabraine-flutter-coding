import React from "react";
import { Form, Button } from "react-bootstrap";

const FormComp = (props) => {
	return (
		<>
			<Form.Group>
				<Form.Label>{props.title}</Form.Label>
				<Form.Control
					name={props.name}
					onChange={props.handleChange}
					placeholder={props.title}
				></Form.Control>
				{props.name === "password" && (
					<div onClick={props.handlePassword}>
						{props.type === "password" ? (
							<i class="fa fa-eye" aria-hidden="true"></i>
						) : (
							<i class="fa fa-eye-slash" aria-hidden="true"></i>
						)}
					</div>
				)}
			</Form.Group>
		</>
	);
};

export default FormComp;
