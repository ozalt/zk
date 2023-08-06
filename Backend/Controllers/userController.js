const mongoose = require("mongoose");
const user = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.KEY, { expiresIn: "3d" });
};

// get all users
const getAll = async (req, res) => {
  const Users = await user.find({}).sort({ createdAt: -1 });
  res.status(200).json(Users);
};

// get single user
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No User" });
  }

  const Users = await user.findById(id);

  if (!Users) {
    return res.status(404).json({ error: "No User Found" });
  }

  res.status(200).json(Users);
};

// post a user
const addUser = async (req, res) => {
  const { name, email, password, contact } = req.body;

  if (!email || !name || !password || !contact) {
    return res.status(400).json("All fields are required");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json("Not a Valid Email");
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json("Please type a Strong Password");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const Users = await user.create({ name, email, password: hash, contact });

      // Create Token

      const token = createToken(user._id);

      res.status(200).json({ Users, token }); // Updated line
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

// update a user

const updateSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No User" });
  }

  const Users = await user.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!Users) {
    return res.status(400).json({ error: "No User Found" });
  }

  res.status(200).json(Users);
};

// delete a user
const deleteSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No User" });
  }

  const Users = await user.findByIdAndDelete({ _id: id });

  if (!Users) {
    return res.status(400).json({ error: "No User Found" });
  }

  res.status(200).json(Users);
};

const uploadProfile = async (req, res) => {
  const { id } = req.params; 
  try {
    const User = await user.findById(id);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    if (User.pic !== null) {
      try {
        fileName = user.pic.replace("userPics\\", "");
        fs.unlinkSync(fileName);
        User.pic = "";
        User.pic = req.file.path;
        await User.save();
        return res.json({ message: "Profile image updated successfully" });
      } catch (error) {
        console.log("Error deleting previous profileImg file:", error);
      }
    }

    // Save the image file path to the user's profileImage field in the database
    User.pic = req.file.path;
    await User.save();

    // Send a response with the updated user data
    return res.json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const favourite = async (req, res) => {
  const { userId, mechId } = req.params;
  try {
    // Find the user by their ID
    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.favourite.includes(mechId)) {
      return res.status(400).json({ error: "mech already added to favorites" });
    }

    existingUser.favourite.push(mechId);
    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error while adding ad to favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("All fields are required");
  }

  const existingUser = await user.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      error:
        "Email you entered is not registered. Try signing in or use a different email that is registered.",
    });
  }

  const match = await bcrypt.compare(password, existingUser.password);

  if (!match) {
    return res
      .status(400)
      .json({ error: `Wrong password ${password} ${existingUser.password}` });
  }

  try {
    const token = createToken(existingUser._id);
    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  addUser,
  deleteSingle,
  updateSingle,
  loginUser,
  uploadProfile,
  favourite,
};
