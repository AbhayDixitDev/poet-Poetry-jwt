const express = require('express')
const router = express.Router()
const upload = require("../Utils/storage")

const poetController = require("../Controllers/poetController")

router.post("/register",upload.single('avatar'),poetController.Register)
router.post("/login",poetController.Login)
router.get("/logout",poetController.Logout)
router.post("/addpoem",upload.single('poster'),poetController.AddPoem)
router.get("/myPoetry",poetController.MyPoetry)
router.get("/allpoems",poetController.AllPoems)
router.get("/allusers",poetController.AllUsers)

module.exports = router