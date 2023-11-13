const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  category: {
    type:String,
    required:true
  },
  image: {
    type:String,
    required:true
  },
  price: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  deleted:{
    type:Boolean,
    default:false
  },
});

module.exports = mongoose.model("Product", productSchema);
