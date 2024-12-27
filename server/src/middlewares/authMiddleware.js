/*ensure user is authenticate by validating its JWT*/ 

const jwt = require("jsonwebtoken");

const verifyToken  = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "No token, authorization denied"});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token and secret key
            req.user = decoded;
            console.log("The decoded user is : ", req.user);
            next();
        } catch(err){
            res.status(400).json({message: "Token is not validate"}); 
        }
    } else {
        return res.status(401).json({message: "No token, authorization denied"});
    }
}

module.exports = verifyToken;