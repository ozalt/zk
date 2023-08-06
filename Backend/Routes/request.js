const express = require('express')
const router = express.Router()
const {
    getAll,
    getSingle,
    addRequest,
    deleteSingle,
    updateSingle,
    forMeMech,
    forMeUser,
} = require("../Controllers/requestController")

router.get("/", getAll)
router.get("/:id", getSingle)
router.get("/forMe/:userId", forMeUser)
router.get("/forMeMech/:mechId", forMeMech)
router.post("/", addRequest)
router.delete("/:id", deleteSingle)
router.patch("/:id", updateSingle)

module.exports = router