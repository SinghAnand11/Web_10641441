const express=require("express")
const router=express.Router()
const prouductController=require("../controllers/Prouduct")

router
    .post("/",prouductController.create)
    .get("/",prouductController.getAll)
    .get("/:id",prouductController.getById)
    .patch("/:id",prouductController.updateById)
    .delete('/:id',prouductController.deleteById)

module.exports=router