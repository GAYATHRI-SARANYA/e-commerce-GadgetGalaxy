const UserController = require('../controllers/userController')
const express = require('express');
const router=express.Router();


router.post("/createUser",UserController.createUser)

module.exports=router 