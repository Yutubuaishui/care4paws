/*ensure user is authenticate by validating its JWT*/ 

const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const verifyToken  = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "No token, authorization denied"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token and secret key
            console.log("Decoded token:", decoded);
            // req.user = decoded;
            const user = await User.findById(decoded.id); // Fetch the user by ID from the database
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        console.log(req.user);
        next();
        } catch(err){
            res.status(400).json({message: "Token is not validate"}); 
        }
    } else {
        return res.status(401).json({message: "No token, authorization denied"});
    }
}

module.exports = verifyToken;