export default (songs = [], action) => {
	switch (action.type) {
		case "GETSONG":
			console.log(action.payload);
			return action.payload;

		case "POSTSONG":
			return [...songs, action.payload];
		default:
			return songs;
	}
};
