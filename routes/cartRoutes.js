
const express = require('express');
const router=express.Router();
const CartController = require('../controllers/cartController')
const Auth = require('../middlewares/auth');

router.post("/createCart", Auth, CartController.createCart);
router.get("/getCart",Auth,CartController.getCart);
router.delete("/delete/:product_id",Auth,CartController.deleteCartProduct);

module.exports=router;