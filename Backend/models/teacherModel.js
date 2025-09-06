import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    teachingExp: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
})

const teacherModel = mongoose.model("Teacher", teacherSchema);

export default teacherModel;