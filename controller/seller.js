const sellerModel = require('../model/seller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerSeller = async (req, res, next) => {
    try {
        const { name, email, country, phoneNumber, password, confirmPassword } = req.body;

        const emailExists = await sellerModel.findOne({ email:email.toLowerCase()})
        if (emailExists) {
            return next({
                message: `Seller with email ${email} already exists`,
                statusCode: 400
            })
        }

        if (password !== confirmPassword) {
            return next({
                message: "Password does not match",
                statusCode: 400
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newSeller = await new sellerModel({
            name,
            email: email.toLowerCase(),
            country,
            phoneNumber,
            password: hashedPassword
        });

        await newSeller.save();

        const data = {
            name: newSeller.name,
            email: newSeller.email,
            country: newSeller.country,
            phoneNumber: newSeller.phoneNumber
        }

        res.status(201).json({
            message: "Seller registered successfully",
            data
        });

    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
};

exports.loginSeller = async (req, res, next) => {
    try {
        const { email, password} = req.body;

        const seller = await sellerModel.findOne({ email: email.toLowerCase() });
        if (!seller) {
            return next({
                message: `Seller with email ${email} does not exist`,
                statusCode: 404
            })
        }

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return next({
                message: "Invalid credentials",
                statusCode: 400
            })
        }

        const token = jwt.sign({ id: seller._id }, process.env.SECRET_KEY, { expiresIn: "1w" });

        res.status(200).json({
            message: "Seller logged in successfully",
            token
        });

    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
};

