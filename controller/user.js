const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
};

exports.getProfile = async (req, res, next) => {
    try {
        const { id } = req.user;
        const {country, "city/state": cityState} = req.body;
        const existingUser = await user.findById(id);

        if(!existingUser) {
            return next({
                message: `User with id ${id} does not exist`,
                statusCode: 404
            })
        }

        const data = {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            phoneNumber: existingUser.phoneNumber
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

        const updatedUser = await user.findByIdAndUpdate(id, location, { new: true })

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
}