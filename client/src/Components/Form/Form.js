import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { postAction } from "../../actions/song.js";

const SignForm = (props) => {
	const [songData, setSongData] = useState({
		songName: "",
		song: "",
	});
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(postAction(songData));
	};

	return (
		<Container>
			<Form className="form" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Post !</Form.Label>
					<Form.Control
						placeholder="Name of the Song"
						name="songname"
						value={songData.songName}
						onChange={(e) =>
							setSongData({ ...songData, songName: e.target.value })
						}
					/>
				</Form.Group>

				<div>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => setSongData({ ...songData, song: base64 })}
					/>
				</div>
				{songData.songName !== "" && songData.song !== "" ? (
					<Button variant="primary" type="submit" onClick={props.onHide}>
						Submit
					</Button>
				) : (
					<>
						<Button
							variant="primary"
							type="submit"
							onClick={props.onHide}
							disabled
						>
							Submit
						</Button>
						<p>*Enabled when whole form is filled </p>
					</>
				)}
			</Form>
		</Container>
	);
};
export default SignForm;
