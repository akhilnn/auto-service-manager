var User = require('../models/user'); // is this necessary?

module.exports = {
	index,
	create
}

function index(req, res) {
	console.log(req.user);
	res.render('vehicles/index', { user: req.user });
}

// add error handling code?
function create(req, res) {
	req.user.vehicles.push(req.body);
	req.user.save(function(err) {
		res.redirect('/vehicles');
	});
}