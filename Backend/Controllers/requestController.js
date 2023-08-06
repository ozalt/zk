const mongoose = require("mongoose");
const Request = require("../Models/requestModel");


// get all Requests
const getAll = async (req, res) => {
  const Requests = await Request.find({}).sort({ createdAt: -1 });
  res.status(200).json(Requests);
};

// get single Request
const getSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No Request" });
  }

  const Requests = await Request.findById(id);

  if (!Requests) {
    return res.status(404).json({ error: "No Request Found" });
  }

  res.status(200).json(Requests);
};

// post a Request
const addRequest = async (req, res) => {
    const { mechId, userId, status, note, date } = req.body;
  
    if (!mechId || !userId) {
      return res.status(400).json("All fields are required");
    }
  
    try {
      const check = await Request.find({ mechId: mechId, userId: userId, date: date });
      if (check.length === 0) {
        const Requests = await Request.create({
          mechId,
          userId,
          status,
          note,
          date,
        });
        return res.status(200).json(Requests);
      }
  
      return res.status(500).json('Only Apply Once in a day');
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

// update a Request

const updateSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No Request" });
  }

  const Requests = await Request.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!Requests) {
    return res.status(400).json({ error: "No Request Found" });
  }

  res.status(200).json(Requests);
};

// delete a Request
const deleteSingle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Invalid ID or No Request" });
  }

  const Requests = await Request.findByIdAndDelete({ _id: id });

  if (!Requests) {
    return res.status(400).json({ error: "No Request Found" });
  }

  res.status(200).json(Requests);
};

// const uploadProfile = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const mech = await Request.findById(id);
//     if (!mech) {
//       return res.status(404).json({ error: "mech not found" });
//     }

//     if (mech.pic !== null) {
//       try {
//         fileName = Request.pic.replace("mechPics\\", "");
//         fs.unlinkSync(fileName);
//         mech.pic = "";
//         mech.pic = req.file.path;
//         await mech.save();
//         return res.json({ message: "Profile image updated successfully" });
//       } catch (error) {
//         return res.json({ message: error });
//       }
//     }
//     mech.pic = req.file.path;
//     await mech.save();

//     // Send a response with the updated mech data
//     return res.json({ message: "Profile image uploaded successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };


const forMeUser = async (req, res) => {
  const {userId} = req.params

  const Requests = await Request.find({ userId: userId, $or: [{ status: 0 }, { status: 1 }]});

  if (!Requests) {
    return res.status(400).json({ error: "No Request Found" });
  }
  res.status(200).json(Requests);
}

const forMeMech = async(req,res) => {
  const {mechId} = req.params

  const Requests = await Request.find({mechId: mechId, $or: [{ status: 0 }, { status: 1 }]});

  if (!Requests) {
    return res.status(400).json({ error: "No Request Found" });
  }
  res.status(200).json(Requests);
}

module.exports = {
  getAll,
  getSingle,
  addRequest,
  deleteSingle,
  updateSingle,
  forMeUser,
  forMeMech,
};
