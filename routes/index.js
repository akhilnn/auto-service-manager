var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET main landing page
router.get('/', function(req, res) {
	res.render('index', { title: 'Auto Service Manager v1.0', user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
	'google',
   	{ scope: ['profile', 'email'] }
   	));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
	'google',
   	{
   		successRedirect : '/vehicles',
     	failureRedirect : '/'
     }
     ));

// passport extends req to include logout()
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;

