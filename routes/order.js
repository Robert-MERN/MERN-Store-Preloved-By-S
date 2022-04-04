const express = require("express");
const router  = express.Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken"); 
const User = require("../models/User");
const Product = require("../models/Product");
// PLACE ORDER
router.post('/place', verifyToken, async (req, res)=> {
    const order = new Order(req.body);
    try {
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

// UPDATE ORDER 
router.put('/update/:id', verifyTokenAdmin, async (req, res)=> {
    try {   
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updateOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE ORDER
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=> {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("the cart has been deleted!");
    } catch(err){
        res.status(500).json(err)
    }
});
// GET ORDER 
router.get('/find/one/:id', verifyTokenAdmin, async (req, res)=> {
    try {
        const order = await Order.findOne({ userId: req.params.id });
        const { createdAt, ...other } = order._doc;
        res.status(200).json(other); 
    } catch(err){
        res.status(500).json(err);
    }   
});

//  GET ALL ORDER
router.get("/find", verifyTokenAdmin, async (req, res)=> {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 2));
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    let fetchDate;
    if(req.query.previous){
        fetchDate = previousMonth;
    } else if(req.query.last){
        fetchDate = lastMonth;
    }
    try {
        let orders;
        if(req.query.previous || req.query.last){
            orders = await Order.find({ createdAt: { $gte: fetchDate } }) 
        } else{
            orders = await Order.find()
        }
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET USERS WHO TRANSACTED LAST
router.get("/find/users", verifyTokenAdmin, async(req, res)=>{
    try{
        const order = await Order.find().sort({createdAt: - 1}).limit(5);
        if(order){
            const users = await Promise.all(
                order.map((each)=>{  
                    return User.findById(each.userId);
                })
                )
                res.status(200).json(users);
        } else{
            res.status(501).json("orders were not found or internal server error");
        }
    } catch(err){
        res.status(401).json(err, "users not found");
    }
})

// GET ORDERED PRODUCTS
router.get("/find/products", async(req, res)=>{
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 2));
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    let fetchDate;
    if(req.query.previous){
        fetchDate = previousMonth;
    } else if(req.query.last){
        fetchDate = lastMonth;
    } else {
        fetchDate = date;
    }
    try{
        let order;
        if(req.query.previous || req.query.last){
            order = await Order.find({ createdAt: { $gte:  fetchDate } });
        } else{
            order = await Order.find();
        };
        if(order){
            const products = await Promise.all(
                order.map((each)=>{
                    for(let i=0; i < each.product.length; i++ ){
                        return Product.findOne({_id: each.product[i].productId});
                    }
                })
                )
                res.status(200).json(products);
        } else {
            res.status(501).json("orders were not found or internal server error");
        }
    } catch(err){
        res.status(401).json(err, "users not found");
    }
})

// MONTHLY INCOME 
router.get('/income',  verifyTokenAdmin, async (req, res)=> {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 2));
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    let fetchDate;
    if(req.query.previous){
        fetchDate = previousMonth;
    } else if(req.query.last){
        fetchDate = lastMonth;
    } else {
        fetchDate = date;
    }
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: fetchDate } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount" ,
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        res.status(200).json(income);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router; 