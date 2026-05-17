const joi = require('joi');

exports.registerValidator = async (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(2).required().messages({
            'string.base': 'Firstname must be a string',
            'string.empty': 'Firstname is required',
            'string.min': 'Firstname must be at least 2 characters long',
            'any.required': 'Firstname is required'
        }),
        lastName: joi.string().trim().min(2).required().messages({
            'string.base': 'Lastname must be a string',
            'string.empty': 'Lastname is required'
        }),
        email: joi.string().trim().email().required().messages({
              'string.email': 'Please enter a valid email',
              'any.required': 'Email is required'
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
        'any required':'Password is required',
        'string.empty':'Password cannot be Empty',
        'string.pattern.base':'Password must be 8 chracters must include upper and lower case'
        }),
        phoneNumber: joi.string().trim().required().messages({
            'string.empty': 'Phone number cannot be empty',
            'any.required': 'Phone number is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};


