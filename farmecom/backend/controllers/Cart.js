const { ObjectId } = require("mongodb");
const Cart = require("../model/Cart");

exports.create=async(req, res) => {
    try {
        const newItem = new Cart(req.body);
        await newItem.save()

        const final=await newItem.populate('product')
        res.status(201).json(final)
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':"internal server error"})
    }
};

exports.getByUserId=async(req, res) => {
    try {
        const {id}=req.params
        const items = await Cart.find({user:id}).populate("product");
        res.status(200).json(items) 
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':"internal server error"})
    }
}

exports.deleteByid=async(req,res)=>{
    try {
        const {id}=req.params
        console.log('id recvied',id)
        const deleted = await Cart.findByIdAndDelete(id)

        console.log('deleted product',deleted)


        res.status(200).json(deleted) 
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':"internal server error"})
    }
}
exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated = await Cart.findByIdAndUpdate(id,req.body,{new:true})

        const populated=await updated.populate("product")
        res.status(200).json(populated) 
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':"internal server error"})
    }
}

