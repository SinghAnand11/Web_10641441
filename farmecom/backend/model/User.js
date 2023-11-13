const mongoose=require('mongoose')
const {Schema}=mongoose


const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    image:{
        type:String,
        default:"none"
    }, 
});

module.exports=mongoose.model("User", userSchema);