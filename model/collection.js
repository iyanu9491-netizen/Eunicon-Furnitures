const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

const collection = mongoose.model('collections', collectionSchema);

module.exports = collection;