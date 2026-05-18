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
    loca: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'seller'
    }
}, {timestamps: true});

const artisan = mongoose.model('artisans', artisanSchema);

module.exports = artisan;