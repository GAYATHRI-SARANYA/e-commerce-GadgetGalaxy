const Product=require("../models/productModel")
const { v4: uuidv4 }= require('uuid');
exports.getProducts= async (req,res)=>{
    try{
        const products=await Product.find()
        //Inside the try block, the Product.find() method is called to fetch all products from the database. The await keyword ensures that the function waits for the database query to complete before proceeding. 
        res.send(products);
    }
    catch(err){
        console.log(err);
    }
};

exports.createProduct = async(req,res)=>{
    const {title,description,price,category,rating ,image}=req.body;
    const product=new Product({
        id:uuidv4(),
        title,
        description,
        price,
        category,
        rating ,
        image
        
    })
    await product.save();
    res.status(200).json("Product Created successfully");
}
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, rating, image } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, category, rating, image },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while updating the product" });
    }
};