const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }, 
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports = mongoose.model("Cart", cartSchema);