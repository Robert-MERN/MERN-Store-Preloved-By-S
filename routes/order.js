const express = require("express");
const router  = express.Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken"); 

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
    try {
        const orders = await Order.find()
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err)
    }
});

// MONTHLY INCOME 
router.get('/income',  verifyTokenAdmin, async (req, res)=> {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
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