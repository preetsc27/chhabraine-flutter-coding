import mongoose from "mongoose";

const schema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String },
});

const userSchema = mongoose.model("User", schema);
export default userSchema;
