var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
      title: 'FNDR Index', 
    });
});

router.get('/home', function(req, res, next){
  if (!req.session.userId) {
    return res.redirect('/');
  }
  res.render('home', { 
    title: 'FNDR Home'
  });
});

router.get('/register', function(req, res, next){
  res.render('home', {
    title: 'Homepage - Registered & Logged In'
  });
});

router.get('/login', function(req, res, next){
  res.render('home', {
    title: 'Homepage - Logged In'
  });
});

router.get('/logout', function(req, res) {
  if (req.session) {
    req.session = null;
    res.cookie('userId', '');
    res.redirect('/');
  }
  console.log(req.session)
});

router.get('/profile', function(req, res, next){
  res.render('profile', {
    title: 'Profile'
  });
});

module.exports = router;
