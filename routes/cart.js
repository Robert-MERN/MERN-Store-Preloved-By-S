const express = require("express");
const router  = express.Router();
const Cart = require("../models/Cart");
const { verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken"); 

// CREATE CART
router.post('/create', verifyTokenAndAuthorization, async (req, res)=> {
    const cart = new Cart(req.body);
    try {
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    } catch(err){
        res.status(500).json(err);
    }
});

// UPDATE CART 
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res)=> {
    try {   
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updateCart);
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE CART
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=> {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("the cart has been deleted!");
    } catch(err){
        res.status(500).json(err)
    }
});
// GET CART 
router.get('/find/one/:id', verifyTokenAdmin, async (req, res)=> {
    try {
        const Cart = await Cart.findOne({ userId: req.params.id });
        const { createdAt, ...other } = Cart._doc;
        res.status(200).json(other); 
    } catch(err){
        res.status(500).json(err);
    }   
});

//  GET ALL CART
router.get("/find", verifyTokenAdmin, async (req, res)=> {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart);
    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router; 