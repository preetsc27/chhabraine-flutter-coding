const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = require("../secret");
const router = express.Router();

const fileUpload = require("../multer/multer").imageUpload;
const User = require("../mongoose/mongoose").userModel;

router.post("/login", async (req, res, next) => {
  let data = req.body;
  let [email, password] = [data.email, data.password];
  const result = await User.find({ email });
  if (result.length > 0) {
    let user = result[0];

    let PASS;
    jwt.verify(user.password, secretKey, (err, data) => {
      if (err) {
        res.status(404);
        res.json({ message: "Problem with jwt verification" });
      } else PASS = data.password;
    });

    if (PASS == password) {
      res.status(200);
      res.json({
        message: "User found.",
        name: user.name,
        email: user.email,
        userPhoto: user.userPhoto,
        id: user._id,
      });
    } else {
      res.status(404);
      res.json({ message: "Wrong Credentials." });
    }
  } else {
    res.status(404);
    res.json({ message: "Can't find User with this email." });
  }
});

router.post("/signup", fileUpload.single("image"), async (req, res, next) => {
  let data = req.body;
  let passToken = jwt.sign(
    {
      password: data.password,
    },
    secretKey
  );
  let createdUser = new User({
    name: data.name,
    email: data.email,
    password: passToken,
    userPhoto: req.file.path,
  });
  const result = await User.find({ email: data.email });
  if (result.length > 0) {
    res.status(404);
    res.json({
      message: "User email already exists. Try to login.",
    });
  } else {
    res.status(201);
    createdUser
      .save()
      .then((user) => {
        res.json({
          name: user.name,
          email: user.email,
          message: "User created successfully",
          userPhoto: user.userPhoto,
          id: user._id,
        });
      })
      .catch(() => {
        res.status(404);
        res.json({ message: "Error in creating new User." });
      });
  }
});

module.exports = router;
