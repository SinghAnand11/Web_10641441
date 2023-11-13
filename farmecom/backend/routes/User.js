const express=require("express")
const router=express.Router()
const userController=require("../controllers/User")

router
    .get("/:id",userController.getById)

module.exports=router