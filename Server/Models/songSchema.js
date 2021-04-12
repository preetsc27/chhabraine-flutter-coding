import mongoose from "mongoose";

const schema = mongoose.Schema({
	songName: String,
	song: String,
	createdAt: {
		type: String,
		default: new Date(),
	},
	creatorId: String,
	creatorName: String,
});

const songSchema = mongoose.model("Song", schema);
export default songSchema;
