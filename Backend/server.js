const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const multer = require("multer");
const cors = require("cors")
// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "userPics/"); // The uploaded files will be stored in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const userPic = multer({ storage });

const mechStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "mechPics/"); // The uploaded files will be stored in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const mechPic = multer({ mechStorage });

// const cors = require("cors")

const usersRoutes = require("./Routes/users");
const servicesRoutes = require("./Routes/services");
const requestRoutes = require("./Routes/request");

// Express App
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static("userPics"));
app.use(express.static("mechPics"));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/rr/users", userPic.single("pic"), usersRoutes);
app.use("/rr/services", mechPic.single("pic"), servicesRoutes);
app.use("/rr/request", requestRoutes);

//connect to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Selecting port number to listen for Requestes
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
