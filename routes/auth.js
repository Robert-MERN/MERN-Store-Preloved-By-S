const express = require("express");
const router  = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport  = require("passport");


// register
router.post("/register", async(req, res)=> {
    try {
        const encrypted = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        const body = req.body;
        const user = new User({
            ...body,
            password: encrypted
        });
        const savedUser = await user.save();
        res.status(200).json(savedUser); 
    } catch(err){
        res.status(500).json(err);
    }
});

//  login
router.post("/login", async(req, res)=> {
    try {
        const user = await User.findOne({username: req.body.username});
        if(user){
            const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);
            if(req.body.password === originalPassword){
                const { password, ...other } = user._doc;
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, process.env.SECRET_JSON, {expiresIn: '1d'});
                res.status(200).json({...other, accessToken});  
            } else {
                res.status(401).json("incorrect password!");
            }
        } else{
            return res.status(401).json("Incorrect email!")
        }
    } catch(err){
        res.status(500).json(err);
    }
})
// passport 
router.get("/login/success", (req, res)=>{
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user
        })
    }
})
router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        success: false,
        message: "failure"
    })
})
router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})
// google strategy
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:9900/api/auth/login/failed",
    successRedirect: "http://localhost:3000/",
}))

// facebook strategy
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:9900/api/auth/login/failed',
    successRedirect: "http://localhost:3000/" 
}));

// github strategy

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github/callback', 
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:9900/api/auth/login/failed',
    successRedirect: "http://localhost:3000/" 
}));

module.exports = router; 