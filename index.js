const express = require("express");
const app=express();
const productsRoutes=require("./routes/productRoutes")
const usersRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")


const mongoose = require('mongoose')
app.use(express.json());
mongoose.connect(
    "mongodb+srv://gayathirik2022cce:DHw1d1DrNz9ybac3@cluster0.lv5djcm.mongodb.net/e_commerce"
).then(()=>{
    console.log("connected to database");
})
app.use("/products",productsRoutes);
app.use("/users",usersRoutes);
app.use("/login",loginRoutes);
app.use("/carts",cartRoutes);
app.use("/orders",orderRoutes);



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})