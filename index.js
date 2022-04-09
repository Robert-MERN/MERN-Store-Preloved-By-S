const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log("we are connected");
});

// middleware function
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// client site
app.use(express.static(path.join(__dirname, "/social-media/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/social-media/build", "index.html"))
})

// backend server
app.listen(process.env.PORT || 9900, ()=> {
    console.log("backend server is running");
})