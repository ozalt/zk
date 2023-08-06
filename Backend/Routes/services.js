const express = require('express')
const router = express.Router()
const {
    getAll,
    getSingle,
    addService,
    deleteSingle,
    updateSingle,
    loginMech,
    uploadProfile
} = require("../Controllers/serviceController")

router.get("/", getAll)
router.get("/:id", getSingle)
router.post("/", addService)
router.post("/uploadProfile/:id", uploadProfile)
router.delete("/:id", deleteSingle)
router.patch("/:id", updateSingle)
router.post("/loginMech", loginMech)

module.exports = router