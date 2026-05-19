const artisanModel = require('../model/artisan');
const jwt = require('jsonwebtoken');

exports.createArtisan = async (req, res, next) => {
    try {
        const { name, profession, experience, location, ratings } = req.body;

        const createArtisan = {
            name,
            profession,
            ratings,
            experience,
            location
        }

        const data = await artisanModel.create(createArtisan);

        res.status(201).json({
            message: 'Artisan created successfully',
            data
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
};

exports.artisanLogin = async (req, res, next) => {
    try {
        const { name, location } = req.body;

        const existingArtisan = await artisanModel.findOne({ name });

        if (!existingArtisan) {
            return next({
                message: 'Invalid name or location',
                statusCode: 401
            })
        }

        const token = jwt.sign(
                    {id: existingArtisan._id, role: existingArtisan.profession},
                    process.env.SECRET_KEY,
                    {expiresIn:'1w'}
                );
                
        res.status(200).json({
            message: 'Login successful',
            existingArtisan,
            token
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
}

exports.getArtisan = async (req, res, next) => {
    try {
        const { id } = req.user;
        const existingArtisan = await artisanModel.findById(id);

        if(!existingArtisan) {
            return next({
                message: `Artisan with id ${id} does not exist`,
                statusCode: 404
            })
        }

        const data = {
            name,
            profession,
            ratings,
            experience,
            location
        }

        res.status(200).json({
            message: "Artisan profile retrieved successfully",
            data
        })


    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
};

exports.allArtisan = async (req, res, next) => {
    try {
        const users = await artisanModel.find();
        res.status(200).json({
            message: 'All  Artisan',
            users
        })
    } catch (error) {
        next({
            messsage: error.message,
            statusCode: 500
        })
    }
};

exports.profession = async (req, res, next) => {
    try {
        const { profession } = req.params;

        const users = await artisanModel.find({profession});
        res.status(200).json({
            message:  `All ${profession}`,
            users
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        })
    }
};