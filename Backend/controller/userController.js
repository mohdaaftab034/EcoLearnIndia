import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


// Register User
export const registerUser = async (req, res)=> {
    try {
        const {firstName, lastName, email, password} = req.body;

        const isUser = await userModel.findOne({email});
        if(isUser){
            return res.json({success: false, message: "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "10d"});

        res.cookie("token", token);

        res.json({success: true, message: "User registered successfully", user})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Login User
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.json({success: false, message: "Invalid Credentials"})
        };

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "10d"});

        res.cookie("token", token);

        res.json({success: true, message: "User logged In successfully", user})

    } catch (error) {
         res.json({success: false, message: error.message});
    }
}

// User Logout
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        res.json({success: true, message: "User Logged Out successfully"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}