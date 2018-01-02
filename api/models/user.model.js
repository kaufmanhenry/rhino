const Mongo = require('./index');
const mongoose = require('mongoose');

const UserModel = Mongo.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}));

module.exports = UserModel;
