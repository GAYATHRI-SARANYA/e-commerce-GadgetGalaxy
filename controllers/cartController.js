const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createCart = async (req,res)=>{
    if(!req.user){
        return res.status(401).json({ error: 'Unauthorized. User not authenticated.' });
    }
    const {user_id} =req.user;
    const {product_id,quantity}=req.body;
    try{

    
    let cart=await Cart.findOne({user_id});    

           if(!cart){
               cart = new Cart({
                user_id,
                products:[
                    {
                        product_id,
                        quantity
                    },
                ],

              });
            }else{
                const ProductIndex = cart.products.findIndex(
                    (prod) => prod.product_id=== product_id
                );
                if(ProductIndex > -1){
                    cart.products[ProductIndex].quantity=quantity;
                }else{
                    cart.products.push({product_id,quantity});
                }
            }
            await cart.save();
        res.status(201).json("Cart Saved Successfully");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

    exports.getCart=async(req,res)=>{
        const {user_id} = req.user

        const cart=await Cart.findOne({user_id});

        if(!cart){
            return res.status(404).json({message:"cart not found"});

        }
        try{
            let subTotal=0;
            const CartItems= await Promise.all(
                cart.products.map(async (product)=>{
                    const productDetails= await Product.findOne({
                        id:product.product_id,
                    })
                        
                    subTotal +=productDetails.price * product.quantity;
                    return{
                        product_id:productDetails.id,
                        title:productDetails.title,
                        description: productDetails.description,
                        price:productDetails.price,
                        image:productDetails.image,
                        quantity:product.quantity,
                        
                    }

                })
            )
            res.status(200).json({cartItems : CartItems, subTotal});
        }catch(err){
              res.status(500).json({message: "server error",err});
        }
       
    }

    exports.deleteCartProduct = async (req, res) => {
        const { user_id } = req.user;
        const { product_id } = req.params; 
    
        try {
            const cart = await Cart.findOne({ user_id });
    
            if (!cart) {
                return res.status(404).json({ message: "Cart Not Found" });
            }
    
            // Find the product in the cart
            const productToRemove = cart.products.find(
                (product) => product.product_id === product_id
            );
    
            if (!productToRemove) {
                console.log(`Product ID ${product_id} not found in cart`, cart.products);
                return res.status(404).json({ message: "Product not found in cart" });
            }
            
            cart.products = cart.products.filter(
                (product) => product.product_id !== product_id
            );
            if (cart.products.length === 0) {
                await Cart.deleteOne({ user_id });
                return res.status(200).json({ message: "Cart deleted successfully" });
            }
    
            await cart.save();
            res.status(200).json({ message: "Product removed from cart successfully" });
        } catch (err) {
            console.error('Error removing product from cart:', err);
            res.status(500).json({ error: 'Failed to remove product from cart' });
        }
    };