const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require('../middleware')


router
    .post("/login",authController.login)
    .post("/signup",authController.signup)
    .get("/check",verifyToken,authController.check)
    .get("/logout",authController.logout)

module.exports=router