var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'FNDR',
    loggedIn: false,
    ifTitle: 'Error',
    elseTitle: 'FNDR' 
  });
});

router.get('/login', function(req, res, next){
  res.render('index', {
    title: 'FNDR',
    loggedIn: true,
    ifTitle: 'Homepage - Logged In',
    elseTitle: 'Error'
  });
});

router.get('/register', function(req, res, next){
  res.render('index', {
    title: 'FNDR',
    loggedIn: true,
    ifTitle: 'Homepage - Registered & Logged In',
    elseTitle: 'Error'
  });
});

module.exports = router;
