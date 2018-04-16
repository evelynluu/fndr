var express = require('express');
var router = express.Router();

var models = require('../models');
var UserModel = models.Users;

'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};

function saltHashPassword(userpassword) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('Hashing password');
  return passwordData;
}

// Register
router.post('/register', function(req, res, next){

  var body = req.body;
  var email = body.email;
  var password = body.password;
  var salt = "";

  // Empty user var
  var user = {
    email,
    password,
    salt
  };

   // Find to see if the User exists
   UserModel.find({'email': email}, function(err, docs){
    if (err) return handleError(err);
  
    // If user doesn't exist
    if(docs.length == 0){
      // Hash the entered password
      var passwordInfo = saltHashPassword(password);
      user.password = passwordInfo.passwordHash;
      user.salt = passwordInfo.salt;

      // Create a new user
      UserModel.create(user)
      .then((createdUser) => {
        console.log(createdUser)
        console.log('creating user...');

        req.session.userId = createdUser._id;
        res.cookie('userId', String(createdUser._id));

        console.log(createdUser._id);
        console.log(req.session.userId);

        console.log('Registration success');
        res.json({ data: createdUser });
      })
      .catch((error) => {
        res.json({ error })
      }) 
    }
    // If the user does exist
    else if(docs.length > 0){
        console.log("User already exists. Cannot register.");
        res.redirect('http://localhost:3000');
    }
    else{
      console.log("General login/registration error")
    }
   });
});

// Logging in
router.post('/login', function(req, res, next){
  
  if (req.session.userId) {
    res.redirect('http://localhost:3000')
    return
  }

  var body = req.body;
  var email = body.email;
  var password = body.password;
  var salt = "";

  // Empty user var
  var user = {
    email,
    password,
    salt
  };

   // Find to see if the User exists
   UserModel.find({'email': email}, function(err, docs){
    if (err) return handleError(err);
  
    // If user doesn't exist
    if(docs.length == 0){
      console.log("User doesn't exist. Cannot login.");
      res.redirect('http://localhost:3000');
    }
    // If the user does exist
    else if(docs.length > 0){
      // Set empty var to existing user
      user = docs[0];

      // Hash the entered password
      var enteredPassword = sha512(password, user.salt);
      
      // See if entered password hash matches the saved hash
      if(user.password == enteredPassword.passwordHash){
        req.session.userId = user._id;
        res.cookie('userId', String(user._id));

        console.log('Login Success');
        res.json({ data: user });
      }
      else{
        console.log('Login Error');
        res.redirect('http://localhost:3000');
      }
    }
    else{
      console.log("General login/registration error")
    }
   });
});

module.exports = router;
