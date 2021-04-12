import userSchema from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const knownUser = await userSchema.findOne({ email });
		if (!knownUser) {
			return res.status(404).json({ message: "User doesn't exist" });
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			knownUser.password
		);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Incorrect Password !" });

		const token = await jwt.sign(
			{ email: knownUser.email, id: knownUser._id, name: knownUser.name },
			"asecretword",
			{ expiresIn: "1h" }
		);
		res.status(200).json({ result: knownUser, token });
	} catch (error) {
		res.status(500).send("Something went wrong while Signing In ");
	}
};
export const signUp = async (req, res) => {
	const { firstname, lastname, email, password, confirmpassword } = req.body;
	try {
		const knownUser = await userSchema.findOne({ email });
		if (knownUser)
			return res.status(404).json({ message: "User already exists !" });
		// if (password !== confirmpassword)
		// 	return res.status(404).json({ message: "Passwords don't match !" });
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await userSchema.create({
			email: email,
			password: hashedPassword,
			name: `${firstname} ${lastname}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id, name: result.name },
			"asecretword",
			{ expiresIn: "1h" }
		);
		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong while Signing Up" });
	}
};
