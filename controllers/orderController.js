const Order= require('../models/orderModel')
const Cart= require('../models/cartModel')
const Product = require('../models/productModel')

exports.createOrder = async (req, res) => {
    const { user_id, email } = req.user;
    const { selectedProductIds, username, phone_number, address } = req.body;

    console.log('Selected Product IDs:', selectedProductIds);
    
    if (!selectedProductIds || !Array.isArray(selectedProductIds)) {
        return res.status(400).json({ message: "Invalid or missing selectedProductIds" });
    }

    try {
        const cart = await Cart.findOne({ user_id });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty or not found" });
        }

        console.log('Cart Products:', cart.products);

        const selectedProducts = cart.products.filter(product =>
            selectedProductIds.includes(product.product_id.toString())
        );

        console.log('Selected Products:', selectedProducts);

        if (selectedProducts.length === 0) {
            return res.status(400).json({ message: "No products selected" });
        }

        const newOrder = new Order({
            user_id,
            user_email: email,
            username,
            address,
            phone_number,
            products: selectedProducts,
        });

        const savedOrder = await newOrder.save();

        cart.products = cart.products.filter(
            product => !selectedProductIds.includes(product.product_id)
        );
        if (cart.products.length === 0) await cart.deleteOne({ user_id });
        else await cart.save();

        res.status(200).json({ message: "Ordered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating order" });
    }
};


exports.getOrders = async (req, res) => {
    const { user_id } = req.user;

    try {
        // Fetch orders for the user
        const orders = await Order.find({ user_id });

        // Check if any orders exist
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        // Populate product details for each order
        const populatedOrders = await Promise.all(
            orders.map(async (order) => {
                const productsWithDetails = await Promise.all(
                    order.products.map(async (product) => {
                        // Fetch product details based on product_id
                        const productDetails = await Product.findOne({
                            id: product.product_id // Match by product_id
                        });

                        // Check if product details were found
                        if (!productDetails) {
                            return res.status(404).json({ message: `Product not found for ID: ${product.product_id}` });
                        }

                        // Return the product details along with the quantity
                        return {
                            product_id: productDetails.id,
                            title: productDetails.title,
                            description: productDetails.description,
                            price: productDetails.price,
                            image: productDetails.image,
                            quantity: product.quantity
                        };
                    })
                );

                // Return the order details with the populated product details
                return {
                    ...order._doc, // Spread the existing order details
                    products: productsWithDetails // Replace products with detailed product info
                };
            })
        );

        // Respond with the populated orders
        res.status(200).json(populatedOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};