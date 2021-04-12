import Song from "../Models/songSchema.js";

export const getSongs = async (req, res) => {
	const songs = await Song.find();

	try {
		res.json(songs);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const postSong = async (req, res) => {
	const song = req.body;

	if (!req.userId) return res.json({ message: "Unauthenticated" });
	console.log(req.name);
	const newSong = new Song({
		...song,
		creatorId: req.userId,
		creatorName: req.name,
	});
	try {
		await newSong.save();
		res.status(201).json(newSong);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
