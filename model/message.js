const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

   senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
   },

   receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artisans',
      required: true
   },

   message: {
      type: String,
      required: true
   }

}, { timestamps: true });

const message = mongoose.model('messages', messageSchema);

module.exports = message;