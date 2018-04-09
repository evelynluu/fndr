var mongoose = require('mongoose');

var Users = require('./users');

mongoose.connect('mongodb://localhost/', function(error) {
  if (error) throw error
  console.log('Connected to DB');
});

module.exports = {
  Users
}