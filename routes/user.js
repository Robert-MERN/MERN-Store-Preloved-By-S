const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(req.body.password, salt);
                req.body.password = newPassword;
            } catch (err) {
                res.status(500).json(err);
            }
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Account has been successfully updated.");

        } catch (err){
            res.status(400).json("something wrong! please try this process again.")
        }  
    } else {
        return res.status(500).json("you can not update others accout."); 
    }
});
// delete user

router.delete('/:id', async (req, res)=> {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({_id: req.params.id});
            res.status(200).json("Account has been successfully deleted.");
        } catch (err){
            res.status(400).json(err);
        }  
    } else {
        return res.status(500).json("you can not update others accout."); 
    }
});
// get a user
router.get('/:id', async (req, res)=>{
    try {
        const userGot = await User.findOne({_id: req.params.id});
        const {password, updatedAt, createdAt, ...other} = userGot._doc;  
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }   
});

// follow
router.put('/:id/follow', async(req, res)=>{
    if(req.body.userId !== req.params.id) {
        try{
           const user =  await User.findOne({ _id: req.params.id });
           const currentUser = await User.findOne({ _id: req.body.userId });
           
           if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push:{ followers: req.body.userId } });
                await currentUser.updateOne({ $push:{ followings: req.params.id } });
                res.status(200).json("you followed");
           }else {
               return res.status(403).json("you have already followed")
           }
        } catch(err) {
            res.status(400).json(err);
        }
    } else {
        return res.status(500).json("you can not follow yourself");
    }
});

//unfollow
router.delete('/:id/unfollow', async (req, res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            const currentUser = await User.findOne({ _id: req.body.userId });

            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("you unfollowed");
            } else {
                return res.status(402).json("first follow")
            }
        } catch(err) {
            res.status(400).status(err);
        }
    } else {
        return res.status(500).json("you can't unfollow yourself");
    }
});

module.exports = router;

