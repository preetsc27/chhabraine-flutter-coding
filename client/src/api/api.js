import axios from "axios";
const API = axios.create({ baseURL: "https://song-up.herokuapp.com" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const postSong = (songData) => API.post("/songs", songData);

export const getSongs = () => API.get("/songs");

export const signIn = (authData) => API.post("/user/signin", authData);

export const signUp = (authData) => API.post("/user/signup", authData);
