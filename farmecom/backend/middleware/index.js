require('dotenv').config()
const jwt=require('jsonwebtoken')
const { sanitizeUser } = require('../common/common')

exports.verifyToken=async(req,res,next)=>{
    try {
        const {token}=req.cookies
        const decodedUser=jwt.verify(token,process.env.SECRET_KEY)

        if(decodedUser){
            const secureUser=sanitizeUser(decodedUser)
            req.user=secureUser
            next()
        }
        else{
            return res.status(401).json({"message":"Invalid Token, please login again"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({"message":"token has been expired, please login again"})
    }
}