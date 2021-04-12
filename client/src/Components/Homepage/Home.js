import { React } from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import Form from "../Form/Form";
import { Row, Col, Container } from "react-bootstrap";
import Songs from "../Songs/Songs";
import { getAction } from "../../actions/song.js";
import { useDispatch } from "react-redux";
const Home = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAction());
	}, [dispatch]);

	return (
		<Row>
			<Col md={8}>
				<Songs />
			</Col>
			{user ? (
				<Col md={4}>
					<Form />
				</Col>
			) : (
				<Col md={4}>
					<Container className="notSigned">
						<p>Hello User, Please SignIn to Post !</p>
					</Container>
				</Col>
			)}
		</Row>
	);
};

export default Home;
