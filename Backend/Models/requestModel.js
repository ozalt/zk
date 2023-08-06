const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    mechId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default:''
    },
    date:{
        type:String,
        required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("request", requestSchema);

module.exports = Service;
