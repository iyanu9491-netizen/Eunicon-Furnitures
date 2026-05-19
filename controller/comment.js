const commentModel = require('../model/comment');
const userModel = require('../model/user')

exports.createComment = async (req, res, next) => {
    try {
        const { id } = req.user;
        const userExist = await userModel.findById(id);

        if (!userExist) {
            next({
                message: 'User not found',
                statusCode: 404
            })
        }

        const { fullName, phoneNumber, email, message } = req.body;

        const data = await commentModel.create({
            fullName,  
            phoneNumber, 
            email: email.toLowerCase(), 
            message
        })

        res.status(201).json({
            message: 'Comment created successfully',
            data
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
}