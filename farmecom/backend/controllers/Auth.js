require("dotenv").config()
const User = require("../model/User");
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken");
const { sanitizeUser } = require("../common/common");

exports.signup = async(req, res) => {
  try {

    const existingUser=await User.findOne({email:req.body.email})
    if(existingUser){
        return res.status(400).json({"message":"user already exists"})
    }

    const hashedPassword=await bcrypt.hash(req.body.password,10)
    req.body.password=hashedPassword

    const newUser=new User(req.body)
    await newUser.save()

    delete newUser.password

    const secureUserInfo=sanitizeUser(newUser)

    const token=jwt.sign(secureUserInfo,process.env.SECRET_KEY,{expiresIn:'3hr'})
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:'Lax',
        maxAge:new Date(Date.now()+90000000000)
    })


    res.status(201).json(newUser)

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.logout=async(req,res)=>{
  try {
    res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true})

    res.status(200).json({'message':'logout succesfull'})
  } catch (error) {
    console.log(error)
  }
}


//api login
exports.login = async (req, res) => {
  try {
    const existingUser=await User.findOne({email:req.body.email})
    if(!existingUser){
        return res.status(404).json({"message":'Invalid Credentails'})
    }

    if(existingUser && (await bcrypt.compare(req.body.password,existingUser.password))){

      const secureUserInfo=sanitizeUser(existingUser)

      const token=jwt.sign(secureUserInfo,process.env.SECRET_KEY,{expiresIn:'3hr'})
      res.cookie('token',token,{
          httpOnly:true,
          sameSite:'Lax',
          maxAge:new Date(Date.now()+90000000000)
      })

      delete existingUser.password
  
      return res.status(200).json(existingUser)
    }

    return res.status(404).json({"message":'Invalid Credentails'})

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


exports.check=async(req,res)=>{
  try {
    if(req.user){
      const data=await User.findById(req.user._id)
      res.status(200).json(data)
    }
    else{
      return res.status(401).json({'message':"please login again"})
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({'message':"please login again"})
  }
}
