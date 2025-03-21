const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  status: {
    type: String,
    default: 'active'
  },
  profilePicture: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,  // Enable timestamps
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export using CommonJS syntax
module.exports = User;
