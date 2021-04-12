import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song/Song.js";
import { Row } from "react-bootstrap";

const Songs = () => {
	const songs = useSelector((state) => state.songs);
	songs.reverse();
	return !songs.length ? (
		<p>Loading...</p>
	) : (
		<div>
			{songs.map((song) => (
				<Song songProp={song} />
			))}
		</div>
	);
};
export default Songs;
