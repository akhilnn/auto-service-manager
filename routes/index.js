var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET main landing page
router.get('/', function(req, res) {
	console.log(req.user);
	// may not be necessary to pass in the user here
	res.render('index', { title: 'Auto Service Manager v1.0', user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
	'google',
   	{ scope: ['profile', 'email'] } // add to scope? [x]
   	));

// Google OAuth callback route (will redirect if fail as well)
// check all URLs
router.get('/oauth2callback', passport.authenticate(
	'google',
   	{
   		successRedirect : '/vehicles',
     	failureRedirect : '/'
     }
     ));

// logout coming from passport on req
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;

