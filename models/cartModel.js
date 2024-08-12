const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
   user_id:String,
   products:[
    {
    product_id: String,
    quantity: Number,
   },
]
})
//Creating the Cart Model
const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart;