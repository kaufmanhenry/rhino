const Mongo = require('./index');
const mongoose = require('mongoose');

const UserModel = Mongo.model('User', new mongoose.Schema({
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
    required: true
  }
}, {
  timestamps: true
}));

module.exports = UserModel;
