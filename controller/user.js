const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {brevo} = require('../utils/brevo');
const {emailTemplate, resetPasswordTemplate, resetPasswordSuccessfulTemplate}= require('../email');
const otp = require('otp-generator')

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phoneNumber} = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        const existingEmail = await userModel.findOne({email: normalizedEmail});
        if(existingEmail) {
            return next({
                message: `User with email ${email} already exists`,
                statusCode: 400
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            firstName,
            lastName,
            email: normalizedEmail,
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
       console.log(error)
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const { id } = req.user;
        const {firstName, lastName, phoneNumber, country, "city/state": cityState} = req.body;
        const existingUser = await user.findById(id);

        if(!existingUser) {
            return next({
                message: `User with id ${id} does not exist`,
                statusCode: 404
            })
        }

        const data = {
            firstName: firstName || existingUser.firstName,
            lastName: lastName || existingUser.lastName,
            email: existingUser.email,
            phoneNumber: phoneNumber || existingUser.phoneNumber
        }
        const location = {
            country,
            "city/state": cityState
        }

        res.status(200).json({
            message: "User profile retrieved successfully",
            data,
            location
        })

        const updatedUser = await user.findByIdAndUpdate(id, { data, location}, { new: true })

        if(!updatedUser) {
            return next({
                message: `User with id ${id} does not exist`,
                statusCode: 404
            })
        }

        res.status(200).json({
            message: "User profile updated successfully",
            data,
            location
        })

    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
};

exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        
        const existingUser = await userModel.findOne({email: email.trim().toLowerCase()});
        if(!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const validPassword = await bcrypt.compare(password, existingUser.password);

        if(!validPassword) {
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

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const existingUser = await userModel.findOne({email: email.toLowerCase()})

        if(!existingUser) {
            return res.status(400).json({
                message: "User with this email does not exist"
            })
        }
            const OTP = Math.round(Math.random() * 1e6).toString().padStart(6, '0');
            existingUser.otp = OTP;
            existingUser.otpExpires = Date.now() + (5 * 60 *1000 )
            const data = {
                name: `${existingUser.firstName} ${existingUser.lastName}`,
                otp: OTP
            }
            await brevo(email, `${existingUser.firstName} ${existingUser.lastName}`, resetPasswordTemplate(data));
            await existingUser.save();

            res.status(200).json({
                message: "Password reset successfully"
            });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
exports.resetPassword = async (req, res)=>{
    try {
        const {otp, newPassword, email} = req.body

        const user = await userModel.findOne({email: email.toLowerCase()})

        if(user == null){
            return res.status(404).json({
                message:'Invalid Credentials'
            })
        }
        console.log(Date.now() > user.otpExpires);
        if ( Date.now() > user.otpExpires || user.otp !== otp ){
            return res.status(400).json({
                message:'Invalid OTP'
            })
        }
        //reset the users password with the encrypted and updated password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.newPassword = hashedPassword
        await user.save()
        brevo(user.email, user.firstName, resetPasswordSuccessfulTemplate(user.firstName));
        
        res.status(200).json({
            message:'Password reset successfully'
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
exports.changePassword = async (req, res)=>{
    try {
        const {id} = req.user 
        const {currentPassword, newPassword} = req.body

        const user = await userModel.findById(id)

        if(!user){
            return res.status(400).json({
                message:'User not Found'
            })
        }
        const validPassword = await bcrypt.compare(currentPassword, user.password)

        if(!validPassword){
            return res.status(400).json({
                message:'Current password is Invalid'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword

        await user.save()

        res.status(200).json({
            message:'Password changed successfully'
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}