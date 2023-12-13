const express = require("express");
const cors = require("cors");
const { connectTodB } = require("./database/db");
const cookieParser=require('cookie-parser')
const morgan=require("morgan")
const server = express();
const authRoutes=require("./routes/Auth")
const productRoutes=require('./routes/Prouduct')
const userRoutes=require("./routes/User")
const cartRoutes=require("./routes/Cart")
const path = require('path')


// databse connection
connectTodB()

// middleware
server.use(express.json({ limit: '10mb' }));
server.use(cors({origin:"http://localhost:3000",credentials:true}));
server.use(cookieParser())
server.use(morgan("tiny"))



// route middlewares
server.use("/auth",authRoutes)
server.use("/products",productRoutes)
server.use("/users",userRoutes)
server.use("/cart",cartRoutes)



server.get("/", (req, res) => {
    res.status(200).json({'message':"running"});
});

//production script
app.use(express.static("./frontend/build"));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
});

server.listen(8000,()=>{
    console.log('server [STARTED] ~ http://localhost:8000')
});
