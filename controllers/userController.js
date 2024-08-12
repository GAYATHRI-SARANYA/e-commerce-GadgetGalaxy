const User=require("../models/userModel")
const { v4: uuidv4 }= require('uuid');
exports.createUser = async(req,res)=>{
    const {name,email,password}=req.body;
    const user=new User({
        id:uuidv4(),
        name,
        email,
        password
        
    })
    await user.save();
    res.status(200).json("User registered successfully");
} 