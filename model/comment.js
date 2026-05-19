const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true});

const comment = mongoose.model('comments', commentSchema);

module.exports = comment;