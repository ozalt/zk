const express = require('express')
const router = express.Router()
const {
    getAll,
    getSingle,
    addUser,
    deleteSingle,
    updateSingle,
    loginUser,
    uploadProfile,
    favourite
} = require("../Controllers//userController")

router.get("/", getAll)
router.get("/:id", getSingle)
router.post("/", addUser)
router.post("/uploadProfile/:id", uploadProfile)
router.delete("/:id", deleteSingle)
router.patch("/:id", updateSingle)
router.post("/login", loginUser)
router.put("/:userId/favourite/:mechId", favourite);

module.exports = router