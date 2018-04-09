var express = require('express');
var router = express.Router();

var models = require('../models');
var UserModel = models.Users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  var body = req.body;
  var email = body.email;
  var password = body.password;

  var newUser = {
    email,
    password
  };

  UserModel.create(newUser)
    .then(() => {
      res.json({ data: newUser });
    })
    .catch((error) => {
      res.json({ error })
    }) 
});

module.exports = router;
