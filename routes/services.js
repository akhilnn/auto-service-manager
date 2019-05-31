var express = require('express');
var router = express.Router();
var servicesCtrl = require('../controllers/services');

// GET /vehicles/:id/services/new
router.get('/:id/services/new', isLoggedIn, servicesCtrl.new);

// POST /vehicles/:id/services
router.post('/:id/services', isLoggedIn, servicesCtrl.create);

// PUT /vehicles/:id/services/:serviceId
router.put('/:id/services/:serviceId', isLoggedIn, servicesCtrl.update);

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next();
	res.redirect('/auth/google');
}

module.exports = router;
