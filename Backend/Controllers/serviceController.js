const mongoose = require("mongoose");
const Service = require("../Models/ServicesModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.KEY, { expiresIn: "3d" });
};

// get all services
const getAll = async (req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });
  res.status(200).json(services);
};

// get single service
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No service" });
  }

  const services = await Service.findById(id);

  if (!services) {
    return res.status(404).json({ error: "No service Found" });
  }

  res.status(200).json(services);
};

// post a service
const addService = async (req, res) => {
  const {
    service,
    provider,
    experience,
    contact,
    password,
    cnic,
    location,
    price,
    description,
  } = req.body;

  if (
    !service ||
    !provider ||
    !experience ||
    !contact ||
    !password ||
    !cnic ||
    !location
  ) {
    return res.status(400).json("All fields are required");
  }

  try {
    const services = await Service.create({
      service,
      provider,
      experience,
      contact,
      password,
      cnic,
      location,
      price,
      description,
    });

    // Create Token

    const token = createToken(Service._id);

    res.status(200).json({ services, token }); // Updated line
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a service

const updateSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No service" });
  }

  const services = await Service.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!services) {
    return res.status(400).json({ error: "No service Found" });
  }

  res.status(200).json(services);
};

// delete a service
const deleteSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No service" });
  }

  const services = await Service.findByIdAndDelete({ _id: id });

  if (!services) {
    return res.status(400).json({ error: "No service Found" });
  }

  res.status(200).json(services);
};

const uploadProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const mech = await Service.findById(id);
    if (!mech) {
      return res.status(404).json({ error: "mech not found" });
    }

    if (mech.pic !== null) {
      try {
        fileName = Service.pic.replace("mechPics\\", "");
        fs.unlinkSync(fileName);
        mech.pic = "";
        mech.pic = req.file.path;
        await mech.save();
        return res.json({ message: "Profile image updated successfully" });
      } catch (error) {
        return res.json({ message: error });
      }
    }
    mech.pic = req.file.path;
    await mech.save();

    // Send a response with the updated mech data
    return res.json({ message: "Profile image uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginMech = async (req, res) => {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    return res.status(400).json("All fields are required");
  }

  const existingmech = await Service.findOne({ cnic: cnic });

  if (!existingmech) {
    return res.status(400).json({
      error:
        "Email you entered is not registered. Try signing in or use a different email that is registered.",
    });
  }

  if (password !== existingmech.password) {
    return res
      .status(400)
      .json({ error: `Wrong password ${password} ${existingmech.password}` });
  }
  return res.status(200).json(existingmech);
};

module.exports = {
  getAll,
  getSingle,
  addService,
  deleteSingle,
  updateSingle,
  loginMech,
  uploadProfile
};
