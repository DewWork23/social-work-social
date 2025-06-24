const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^.+@uncp\.edu$/, 'Must use UNCP email address']
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  graduationYear: {
    type: Number,
    required: true
  },
  interests: [{
    type: String
  }],
  bio: {
    type: String,
    maxLength: 500
  },
  isActive: {
    type: Boolean,
    default: true
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);