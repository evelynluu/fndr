var express = require('express');
var router = express.Router();

var models = require('../models');
var UserModel = models.Users;

router.post('/', function(req, res, next){
  var body = req.body;
  var email = body.email;
  var password = body.password;

  var newUser = {
    email,
    password
  };

   // Find to see if the User exists
   UserModel.find({'email': email}, function(err, docs){
    if (err) return handleError(err);
  
    if(docs.length == 0){
      UserModel.create(newUser)
      .then(() => {
        res.json({ data: newUser });
      })
      .catch((error) => {
        res.json({ error })
      }) 
    }
    else if(docs.length > 0){
      console.log(docs[0].email + ', ' + docs[0].password)
      res.json({ data: newUser });
    }
    else{
      console.log("login error")
    }
   });
});

module.exports = router;
