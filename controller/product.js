const sellerModel = require('../model/seller');
const productModel = require('../model/product');
require('dotenv').config();
const collectionModel = require('../model/collection');
const cloudinary = require('../config/cloudinary');

exports.uploadProduct = async (req, res, next) => {
    try {
        const { id } = req.user;
        console.log(req.user)
        const { productName, price, collection, productImage } = req.body;
   
        const uploadCloud = await cloudinary.uploader.upload(req.file.path);

        if (!req.file.path) {
            return next({
                message: 'File Path not found',
                statusCode: 404
            })
        }

        const createProduct = await productModel.create({
            productName,
            price,
            collection,
            productImage: uploadCloud.secure_url
        })

        res.status(201).json({
            message: 'menu created successfully',
            createProduct
        })
    } catch (error) {
        next({
                message: error.message,
                statusCode: 500
            })
    }
}