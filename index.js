const express= require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const path = require("path");
 

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("server is connected"))
.catch((err)=> console.log(err, "server couldn't get connected"));


// middlewares
app.use(cookieSession({
    name: "session",
    keys: ["store"],
    maxAge: 24 * 60 * 60 * 100
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,DELETE,POST",
    credentials: true
}));
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/checkout", stripeRouter);

// client site
app.use(express.static(path.join(__dirname, "/e-commerce-client/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/e-commerce-client/build", "index.html"))
})

// admin site
app.use(express.static(path.join(__dirname, "/admin-site/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/admin-site/build", "index.html"))
})

// backend server
app.listen(process.env.PORT || 5000, ()=> {
    console.log("backend server is running");
})