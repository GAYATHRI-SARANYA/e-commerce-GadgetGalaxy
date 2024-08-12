const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    category: String,
    images: String,
    rating:{
       rate:Number,
       count:Number
    }
})
//Creating the Product Model
const Product = new mongoose.model('Product',productSchema)
module.exports = Product;

