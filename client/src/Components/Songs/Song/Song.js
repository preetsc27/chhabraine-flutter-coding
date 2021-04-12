import React from "react";
import "./Song.css";
import moment from "moment";

import { Col, Card, Button } from "react-bootstrap";
const Song = ({ songProp }) => {
	const handleClick = (e) => {
		e.preventDefault();

		let audio = new Audio(songProp.song);
		audio.play();
	};
	return (
		<Col>
			<Card className="text-center m-2">
				<Card.Header></Card.Header>
				<Card.Body>
					<Card.Title>{songProp.songName}</Card.Title>

					<Button variant="primary" onClick={handleClick}>
						Play
					</Button>
					<h5 className="uploaderName">By : {songProp.creatorName}</h5>
				</Card.Body>
				<Card.Footer className="text-muted">
					{moment(songProp.createdAt).fromNow()}
				</Card.Footer>
			</Card>
		</Col>
	);
};

export default Song;
