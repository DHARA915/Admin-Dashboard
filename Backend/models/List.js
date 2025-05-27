const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  notes: {
    type: String,
    trim: true,
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Agent',
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List', ListSchema);