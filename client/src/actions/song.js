import * as api from "../api/api.js";

export const getAction = () => async (dispatch) => {
	try {
		const { data } = await api.getSongs();
		// console.log(data);
		dispatch({ type: "GETSONG", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const postAction = (songData) => async (dispatch) => {
	try {
		const { data } = await api.postSong(songData);
		dispatch({ type: "POSTSONG", payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
