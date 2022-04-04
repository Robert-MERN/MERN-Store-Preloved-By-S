const express = require("express");
const router  = express.Router();
const User = require("../models/User");
const cryptoJS = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken"); 
// UPDATE USER 
router.put('/update/:id', async (req, res)=> {
    if(req.body.password) {
        const encrypted = cryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        req.body.password = encrypted;
    }
    try {   
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE USER
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res)=> {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("the user has been deleted!");
    } catch(err){
        res.status(500).json(err)
    }
});
// GET USER 
router.get('/find/one/:id', verifyTokenAndAuthorization, async (req, res)=> {
    try {
        const user = await User.findById(req.params.id);
        const { createdAt, updatedAt, password, ...other } = user._doc;
        res.status(200).json(other); 
    } catch(err){
        res.status(500).json(err);
    }   
});
//  GET ALL USER
router.get("/find/all", verifyTokenAdmin, async (req, res)=> {
    const query = req.query.new;
    try {
        const users = query? await User.find().sort({_id: -1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err)
    }
});

// GET USER STATS
router.get('/stats', verifyTokenAdmin, async (req, res)=> {
    const currentYear = new Date();
    const lastYear = new Date(currentYear.setFullYear(currentYear.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }, 
                }
            }
        ]);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router; 