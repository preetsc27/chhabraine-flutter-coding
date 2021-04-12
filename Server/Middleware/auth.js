import jwt from "jsonwebtoken";

const secret = "asecretword";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		let decodedData;

		decodedData = jwt.verify(token, secret);

		req.userId = decodedData?.id;
		req.name = decodedData?.name;

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
