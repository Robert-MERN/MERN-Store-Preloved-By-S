const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');


//Register

router.post('/register', async (req, res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hacker = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await hacker.save();
        res.status(200).json(user); 
    }
    catch(err){
        res.status(500).json(err);
    } 
});
//Login

router.post('/login', async (req, res)=>{
    try {
        const userId = await User.findOne({email:req.body.email});
        const correctPassword = await bcrypt.compare(req.body.password, userId.password);
        if (correctPassword) {
            res.status(200).json(userId);
        } else {
            return res.status(404).json("Email or Password wrong");
        }
    } catch (err) {
        res.status(500).json("couldn't find a user, might be your email or password wrong")
    }
})


module.exports = router;



