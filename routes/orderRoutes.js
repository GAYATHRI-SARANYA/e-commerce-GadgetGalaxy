const OrderController = require('../controllers/orderController')
const express = require('express');
const router=express.Router();
const Auth = require('../middlewares/auth');


router.post("/createOrder", Auth, OrderController.createOrder);
router.get("/getOrder",Auth,OrderController.getOrders);
module.exports=router 