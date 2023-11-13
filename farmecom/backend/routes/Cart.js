const express=require('express')
const router=express.Router()
const cartController=require('../controllers/Cart')


router
    .post('/',cartController.create)
    .get("/user/:id",cartController.getByUserId)
    .patch("/:id",cartController.updateById)
    .delete("/:id",cartController.deleteByid)
module.exports=router