import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import songs from "./Routes/songs.js";
import users from "./Routes/users.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/songs", songs);
app.use("/user", users);

app.get("/", (req, res) => {
	res.send("Server is ready..");
});
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
	)
	.catch((error) => console.log(`${error} did not connect `));

mongoose.set("useFindAndModify", false);
