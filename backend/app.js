const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/uploads/image", express.static(path.join("uploads", "image")));
app.use("/uploads/audio", express.static(path.join("uploads", "audio")));
app.use(bodyParser.json());
app.use("/auth", authRoute);
app.use("/user", userRoute);

mongoose
  .connect(
    "mongodb+srv://Aashu:build4mongo@cluster0.wneuf.mongodb.net/prac?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.error("Cannot connect :(", err);
  });
