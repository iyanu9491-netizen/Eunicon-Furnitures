const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    hireNow: {
        type: String
    },
    message: {
        type: String
    },
}, {timestamps: true});

const artisan = mongoose.model('artisans', artisanSchema);

module.exports = artisan;