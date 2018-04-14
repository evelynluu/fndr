var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'FNDR',
    loggedIn: false,
    ifStatement: 'Error',
    elseStatement: 'FNDR' 
  });
});

router.get('/login', function(req, res, next){
  res.render('index', {
    title: 'FNDR',
    loggedIn: true,
    ifStatement: 'Homepage - Logged In',
    elseStatement: 'Error'
  });
});

router.get('/register', function(req, res, next){
  res.render('index', {
    title: 'FNDR',
    loggedIn: true,
    ifStatement: 'Homepage - Registered & Logged In',
    elseStatement: 'Error'
  });
});

module.exports = router;
