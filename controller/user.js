const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {brevo} = require('../utils/brevo');
const {emailTemplate, resetPasswordTemplate, resetPasswordSuccessfulTemplate}= require('../email');

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phoneNumber} = req.body;

        const existingEmail = await user.findOne({email: email.toLowerCase()});
        if(existingEmail) {
            return next({
                message: `User with email ${email} already exists`,
                statusCode: 400
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber
        })

        const data = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber
        }

        res.status(201).json({
            message: "User registered successfully",
            data
        });
    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
}
exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        const existingUser = await user.findOne({email: email.toLowerCase()});
        if(!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign(
            {id: existingUser._id, role: existingUser.role},
            process.env.SECRET_KEY,
            {expiresIn:'1d'}
        );
        
        res.status(200).json({
            message:"login sucessful",
            token,
            existingUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body
        const existingUser = await user.findOne({email: email.toLowerCase()});
        if(!existingUser) {
            return res.status(400).json({
                message: "User with this email does not exist"
            })
        }
            const OTP = Math.round(Math.random() * 1e6).toString().padStart(6, '0');
            existingUser.otp = OTP;
            existingUser.otpExpires = Date.now() + (30 * 1000)
            const data = {
                name: `${existingUser.firstName} ${existingUser.lastName}`,
                otp: OTP
            }
            await brevo(email, `${existingUser.firstName} ${existingUser.lastName}`, resetPasswordTemplate(data));
            await existingUser.save();
            res.status(200).json({
                message: "Password reset OTP sent successfully"
            });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
