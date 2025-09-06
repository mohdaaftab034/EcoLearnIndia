import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import teacherModel from '../models/teacherModel.js';



// Register User
export const registerTeacher = async (req, res)=> {
    const { fullName, email, password, phoneNumber, city, institute, teachingExp, confirmPassword, subject} = req.body;
    try {
        const isUser = await teacherModel.findOne({email});

        if(isUser){
            res.json({success: false , message: "User already exists, You can login"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await teacherModel.create({
            fullName,
            email,
            password: hashedPassword,
            confirmPassword, 
            phoneNumber, 
            city, 
            institute, 
            teachingExp, 
            subject
        })
        await user.save();
        
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '10d' })

        res.cookie("token", token);

        res.json({success: true, message: "Teacher registered successfully", user});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// Login User
export const teacherLogin = async (req, res) => {
    try {
        const {email, password, fullName} = req.body;

        const user = await teacherModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, {expiresIn: "10d"})

        res.cookie("token", token);

        res.json({success: true, message: "Teacher login successful", user});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// Logout User
export const teacherLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({success: true, message: "Teacher logged out successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

