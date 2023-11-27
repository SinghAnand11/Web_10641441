const Product = require("../model/Product");


exports.create=async(req, res) => {
    try {
        const newProduct =new Product(req.body);
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mesage: "Error creating product" });
    }
};

//
exports.getAll=async(req, res) => {

    let condition={}

    if(req.query.admin){
        condition.deleted={$ne:true}
    }

    const data = await Product.find(condition);
    res.send(JSON.stringify(data));
}
//
exports.getForUsers=async(req, res) => {
    const data = await Product.find({});
    res.send(JSON.stringify(data));
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mesage: "Error deleting item" });
    }
}
exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        console.log(product)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ mesage: "Error deleting item" });
    }
}

exports.deleteById=async (req, res) => {
    const id = req.params.id;
    const itemId = id.slice(1);
    console.log(typeof JSON.stringify(itemId));

    try {
        // Use the MongoDB model to delete the item by ID
        console.log("heree= >>>>", itemId);
        console.log("heree= >>>>", typeof itemId);
        productModel.findOne({ _id: itemId }, (err, result) => {
            if (err) {
                console.error("Error checking if item exists:", err);
            } else if (result) {
                console.log("Item exists:", result);
            } else {
                console.log("Item does not exist.");
            }
        });
        await productModel.findByIdAndRemove(itemId);
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting item" });
    }
}