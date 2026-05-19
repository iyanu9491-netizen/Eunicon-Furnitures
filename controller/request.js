const requestModel = require('../model/request');
const userModel = require('../model/user')

exports.createRequest = async (req, res, next) => {
    try {
        const { id } = req.user;
        const userExist = await userModel.findById(id);

        if (!userExist) {
            next({
                message: 'User not found',
                statusCode: 404
            })
        }

        const { fullName, city, state, phoneNumber, email, address, country, postalCode, message } = req.body;

        const data = await requestModel.create({
            fullName, 
            city, 
            state, 
            phoneNumber, 
            email: email.toLowerCase(), 
            address, 
            country, 
            postalCode, 
            message
        })

        res.status(201).json({
            message: 'Request created successfully',
            data
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
}