const multer = require("multer");

const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
};

const imageUpload = multer({
  limits: 1000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/image");
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype];

      cb(null, Date.now() + "_" + Math.random() * 4 + "." + ext);
    },
  }),
});
const audioUpload = multer({
  limits: 5000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/audio");
    },
    filename: (req, file, cb) => {
      const ext = MINE_TYPE_MAP[file.mimetype] || "mp3";
      cb(null, Date.now() + "_" + Math.random() * 4 + "." + ext);
    },
  }),
});

exports.imageUpload = imageUpload;
exports.audioUpload = audioUpload;
