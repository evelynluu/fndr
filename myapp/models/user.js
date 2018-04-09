var mongoose = require('mongoose');

var UserModel = mongoose.model('User', {
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = UserModel