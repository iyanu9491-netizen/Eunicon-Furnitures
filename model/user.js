const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    cityState: {
        type: String
    },
    otp:{
        type: String,
        trim:true
    },
    otpExpires:{
        type: Date,
        default:()=>{
            return Date.now() + (5 * 60 * 1000)
        }
    }
}, {timestamps: true});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;