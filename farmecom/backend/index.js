const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const mongo = require('mongodb')

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;
// mongodb collection
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//model
const userModel = mongoose.model("user", userSchema);
//api
app.get("/", (req, res) => {
  res.send("server is running");
});
// sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: " Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "login is sucessfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: " Email is not available, Please sign up",
        alert: false,
      });
    }
  });
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload Successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

app.delete('/product/:id', async (req, res) => {
  const id = req.params.id;
  const itemId = id.slice(1);
  console.log(typeof JSON.stringify(itemId))

  try {
    // Use the MongoDB model to delete the item by ID
    productModel.findOne({ _id: itemId }, (err, result) => {
      if (err) {
        console.error('Error checking if item exists:', err);
      } else if (result) {
        console.log('Item exists:', result);
      } else {
        console.log('Item does not exist.');
      }
    })
    await productModel.findByIdAndRemove(itemId);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting item' });
  }
})

//server running
app.listen(PORT, () => console.log("server is running at port:" + PORT));