/*manage resgitration and login for users
  process data and return response*/

//hashes user's password using bcrypt for security
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) =>{
    try{
        const {email, password, role, username} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        //check if user exist
        const existUser = await User.findOne({email});

        if (existUser){
            return res.status(400).json({ message: "User with this email already exists" });
        }
        
        //else, create a new user
        const newUser = new User({email, password: hashedPassword, role, username});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (err){
        res
            .status(500)
            .json({message:"Something went wrong", error: err.message});
    }

};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
    
        if(!user){
            return res
            .status(404)
            .json({message:`User with email ${email} not found`});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res
            .status(400)
            .json({message:"Invalid credential"});
        }

        //authenticate with JWT, expires in 1 hour
        const token = jwt.sign({
            id:user._id, 
            role: user.role,
            username: user.username,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: "1h"}

    );

    res.status(200).json({ token });

    } catch(err){
        res
            .status(500)
            .json({message:"Something went wrong", error: err.message});
    }
    
};

const logout = async(req, res) =>{
    try{
        res.clearCookie('token');
        res.status(200).json({message: "User logout successfully"});
    } catch (err){
        res
            .status(500)
            .json({message:"Something went wrong", error: err.message});
    }
}

module.exports = {
    register, 
    login,
    logout,
};