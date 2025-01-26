const express = require('express')
const router = express.Router()
const poetController = require("../Controllers/poetController")
router.post("/register",poetController.register)

module.exports = router