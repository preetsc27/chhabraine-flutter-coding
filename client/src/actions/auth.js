import * as api from "../api/api.js";

export const signIn = (authData, history) => async (dispatch) => {
	const { data } = await api.signIn(authData);
	try {
		dispatch({ type: "AUTH", data });
		history.push("/");
	} catch (error) {
		console.log(error.message);
	}
};

export const signUp = (authData, history) => async (dispatch) => {
	const { data } = await api.signUp(authData);
	try {
		dispatch({ type: "AUTH", data });
		history.push("/");
	} catch (error) {
		console.log(error.message);
	}
};
