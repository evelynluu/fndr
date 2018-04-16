var mongoose = require('mongoose');

var UserModel = mongoose.model('User', {
  email: {
    type: String,
    unique: true
  },
  password: String,
  salt: String
});

module.exports = UserModel