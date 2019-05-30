var express = require('express');
var router = express.Router();
var dealershipsCtrl = require('../controllers/dealerships');

// GET /dealerships/new
router.get('/dealerships/new', isLoggedIn, dealershipsCtrl.new);

// POST /dealerships
router.post('/dealerships', isLoggedIn, dealershipsCtrl.create);


// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next();
	res.redirect('/auth/google');
}

module.exports = router;
