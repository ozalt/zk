const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
    },
    pic:{
      type:String
    },
    password: {
      type: String,
      required: true,
    },
    cnic: {
      type: Number,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    pic: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
