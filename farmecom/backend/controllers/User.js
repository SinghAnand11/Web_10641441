const User = require("../model/User")

exports.getById=async(req,res)=>{
    const {id}=req.params
    try {
        const user=(await User.findById(id)).toObject()
        delete user.password
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}