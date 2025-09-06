import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    school: [
        {
            schoolName: {
                type: String,
                default: ""
            },
            schoolAddress: {
                type: String,
                default: ""
            }
        }
    ],
    student: [
        {
            address: {
                type: String,
                default: ""
            },
            state: {
                type: String,
                default: ""
            }
        }
    ], 
    totalPoints: {
        type: Number, default: 0
    },
    globalRank: {
        type: Number
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;

