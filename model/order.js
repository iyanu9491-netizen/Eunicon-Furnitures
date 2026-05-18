const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
    },
    total: {
        type: Number
    },
    reference: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','failed','processing', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {timestamps: true});

const order = mongoose.model('orders', orderSchema);

module.exports = order;