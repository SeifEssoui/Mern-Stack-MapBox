const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ['admin', 'employee', 'driver'],
    default: 'employee',
  },
  itineraire: { type: mongoose.Schema.Types.ObjectId, ref: 'Itineraire' }, // +* iteneraira convert to tbale 
  tokens: [{ token: { type: String, required: true } }] // Add 'tokens' property as an array of objects
  // Add any other relevant fields for your users
});

const User = mongoose.model('User', userSchema);

module.exports = User;
