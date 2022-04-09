const router = require('express').Router();
const Post = require("../models/Posts");
const User = require('../models/users');



//create post
router.post('/', async(req, res)=> {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json("can not post");
    }                                                   
});
//update post
router.put('/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.updateOne({ $set: req.body } );
            res.status(200).json("post has been updated");  
        } else {
            return res.status(400).json("you can't update others post");
        }
    } catch(err) {
        res.status(500).json(err)
    }
}); 
//delete post
router.delete('/:id', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("post has been deleted");
        } else {
            return res.status(404).json("you can't delete other's post");
        }
    } catch (err){
        res.status(500).json   (err)
    }
});
//like or unlike post
router.put('/:id/like', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.like.includes(req.body.userId)) {
            await post.updateOne( { $push: { like: req.body.userId } } );
            res.status(200).json("you liked the post");
        } else if(post.like.includes(req.body.userId)) {
            await post.updateOne( { $pull: { like: req.body.userId } } );
            res.status(200).json("you disliked the post");
        } else {
            return res.status(404).json("something was wrong");
        }
    } catch(err) {
        res.status(500).json("you did something wrong");
    }
});
//get post
router.get('/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        const { updatedAt, ...other } = post._doc
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err)
    }
})
//get post on timeline
router.get('/timeline/all', async (req, res)=> {
    try {
        const user = await User.findById(req.body.userId);
        const myPost = await Post.find( { userId: user._id } );
        const friendsPost = await Promise.all(
            user.followings.map((friends) => { 
            return Post.find( { userId: friends } );
            })
        );
        res.status(200).json(myPost.concat(...friendsPost));
    } catch(err) {
        res.status(500).json("post something to discover the world");
    }

}) 

module.exports = router;