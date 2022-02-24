const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken"); 

// CREATE PRODUCT
router.post('/create', verifyTokenAdmin, async (req, res)=> {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

// UPDATE PRODUCT 
router.put('/update/:id', verifyTokenAdmin, async (req, res)=> {
    try {   
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updateProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE PRODUCT
router.delete('/delete/:id', verifyTokenAdmin, async (req, res)=> {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("the product has been deleted!");
    } catch(err){
        res.status(500).json(err)
    }
});
// GET PRODUCT 
router.get('/find/one/:id', async (req, res)=> {
    try {
        const product = await Product.findById(req.params.id);
        const { createdAt, ...other } = product._doc;
        res.status(200).json(other); 
    } catch(err){
        res.status(500).json(err);
    }   
});
//  GET ALL PRODUCT
router.get("/find/all", async (req, res)=> {
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;
    try {
        let products;
        if(newQuery) {
            products = await Product.find().sort({createdAt: -1}).limit(5); 
        } else if(categoryQuery){
            products = await Product.find( { categories: { $in: categoryQuery } } );
        } else {
            products = await Product.find().sort({createdAt: -1});
        };
        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router; 