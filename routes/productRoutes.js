const ProductController = require('../controllers/productController')
const express = require('express');
const router=express.Router();
const auth=require("../middlewares/auth");
router.get("/getProducts",auth,ProductController.getProducts)
router.post("/createProduct",ProductController.createProduct)
router.post("/createProduct",auth,ProductController.createProduct)
router.put("/:id",ProductController.updateProduct)
module.exports=router