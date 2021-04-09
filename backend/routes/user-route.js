const express = require("express");
const router = express.Router();

const fileUpload = require("../multer/multer").imageUpload;
const Song = require("../mongoose/mongoose").songModel;
const User = require("../mongoose/mongoose").userModel;
const songUpload = require("../multer/multer").audioUpload;

router.get("/songs/:skip", async (req, res, next) => {
  const skip = Number.isFinite(req.params.skip) || 0;
  const result = await Song.find({}, null, {
    sort: { date: -1 },
    limit: 25,
    skip: skip,
  });
  if (result.length == 0) {
    res.status(404);
    res.json({ message: "No song found." });
  } else {
    res.status(200);
    res.json(result);
  }
});

router.get("/songs", async (req, res, next) => {
  const result = await Song.find({}, null, { sort: { date: -1 }, limit: 25 });
  if (result.length == 0) {
    res.status(404);
    res.json({ message: "No song found." });
  } else {
    res.status(200);
    res.json(result);
  }
});

router.post("/song", songUpload.single("song"), (req, res, next) => {
  const path = req.file.path;
  const name = req.file.originalname;
  const newSong = new Song({
    songPath: path,
    songName: name,
    date: Date.now(),
  });
  newSong.save().then(() => {
    res.json({ message: "file is being uploaded." });
  });
});

router.post("/profile", fileUpload.single("image"), async (req, res, next) => {
  let path = req.file.path;
  let id = req.body.id;
  const result = await User.findOne({ _id: id });
  result.name = req.body.name;
  result.userPhoto = path;
  result.save().then(() => {
    res.json({
      message: "Updated",
      name: result.name,
      userPhoto: result.userPhoto,
    });
  });
});

module.exports = router;
