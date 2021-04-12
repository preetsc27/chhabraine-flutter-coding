import React from "react";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Song from "../Songs/Song/Song.js";
import { Row } from "react-bootstrap";

const Profile = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const songs = useSelector((state) => state.songs);
	const userSongs = songs.filter((song) => song.creatorId === user.result._id);
	userSongs.reverse();

	return (
		<div>
			<Container>
				<p>Hey there, You are signed In !</p>
				<h4>{user.result.name}</h4>
			</Container>
			<p>Your Uploads : </p>
			{userSongs.map((song) => (
				<Song songProp={song} />
			))}
			<Container></Container>
		</div>
	);
};

export default Profile;
