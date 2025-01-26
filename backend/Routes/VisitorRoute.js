const express = require('express')
const router = express.Router()
const upload = require("../Utils/storage")

const visitorController = require("../Controllers/visitorController")

router.post("/register",upload.single('avatar'),visitorController.Register)
router.post("/login",visitorController.Login)
router.get("/logout",visitorController.Logout)
router.get("/allpoems",visitorController.AllPoems)
router.post("/like",visitorController.Likes)
router.get("/likedpoems",visitorController.LikedPoems)
router.post("/givereview",visitorController.GiveReview)
router.get("/myreviews",visitorController.MyReviews)

module.exports = router