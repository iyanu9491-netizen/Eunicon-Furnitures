const { required } = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    collection: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    productImage: {
        type: String
    }
}, {timestamps: true});

const product = mongoose.model('products', productSchema);

module.exports = product;