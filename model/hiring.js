const mongoose = require('mongoose');

const hiringSchema = new mongoose.Schema({

   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },

   artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan'
   },

   status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
   }

}, { timestamps: true });

const hiring = mongoose.model('hirings', hiringSchema);

module.exports = hiring;