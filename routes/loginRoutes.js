const LoginController = require('../controllers/loginController')
const express = require('express');
const router=express.Router();


router.post("/login",LoginController.login)

module.exports=router 