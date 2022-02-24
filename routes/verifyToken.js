const jwt = require("jsonwebtoken");

// VERIFY

const verifyToken = (req, res, next)=> {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_JSON, (err, user)=> {
            if(err) return res.status(401).json("token is not valid")
            req.user = user
            next()
        }); 
    } else {
        return res.status(401).json("you are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            return res.status(403).json("you are not allowed to do that!");
        }
    })
}
const verifyTokenAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin){
            next();
        } else{
            return res.status(403).json("No one is allowed to to do that except admin!");
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin };