const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pic:{
      type: String,
    },
    favourite:{
      type: [String],
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User',  userSchema);

module.exports = User;