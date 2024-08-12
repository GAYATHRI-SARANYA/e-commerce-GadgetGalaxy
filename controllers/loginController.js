const User=require("../models/userModel")
const bycrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

exports.login=async(req,res)=>{
    const {email,password} =req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
           return  res.status(400).json("Invalid Email or Password")
        }
        const isMatch=await bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json("Invalid Email or Password");
        }
        const token=jwt.sign({user_id : user._id, email: user.email},"secret_token",{
            expiresIn:"1h"
        });
        return res.status(200).json(token);
        
    }catch(err){
        console.error(err);
    }
};