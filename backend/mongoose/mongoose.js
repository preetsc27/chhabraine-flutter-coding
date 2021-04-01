const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userPhoto: { type: String, required: true },
});
const songSchema = new schema({
  songPath: { type: String, required: true },
  songName: { type: String, required: true },
  date: { type: Number, required: true },
});

exports.userModel = mongoose.model("user", userSchema);
exports.songModel = mongoose.model("song", songSchema);
