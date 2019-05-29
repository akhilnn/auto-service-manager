var express = require('express');
var router = express.Router();
var vehiclesCtrl = require('../controllers/vehicles');

// GET /vehicles
router.get('/', isLoggedIn, vehiclesCtrl.index);

// GET /vehicles/:id
router.get('/:id', isLoggedIn, vehiclesCtrl.show);

// POST to /vehicles
router.post('/', isLoggedIn, vehiclesCtrl.create);

// DELETE /vehicles/:id
router.delete('/:id', isLoggedIn, vehiclesCtrl.dlte);

// Why does this not need to require passport?
// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next();
	res.redirect('/auth/google');
}

module.exports = router;