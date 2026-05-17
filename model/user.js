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
        type: String,
        required: true
    },
    cityState: {
        type: String,
        required: true
    },
    otp:{
        type: String,
        trim:true
    },
    otpExpires:{
        type: Date,
        default:()=>{
            return Date.now() + 30 * 1000
        }
    }
}, {timestamps: true});

const user = mongoose.model('users', userSchema);

module.exports = user;