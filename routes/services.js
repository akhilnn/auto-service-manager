var express = require('express');
var router = express.Router();
var servicesCtrl = require('../controllers/services');

// mount and use in server.js [x]
// isLoggedIn export

// GET /vehicles/:id/services/new
router.get('/:id/services/new', isLoggedIn, servicesCtrl.new);

// POST /vehicles/:id/services
router.post('/:id/services', isLoggedIn, servicesCtrl.create);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next();
	res.redirect('/auth/google');
}

module.exports = router;