var User = require('../models/user'); // is this necessary?

module.exports = {
	index,
	show,
	create,
	dlte
}

function index(req, res) {
	console.log(req.user);
	res.render('vehicles/index', { user: req.user });
}

// not using cb functions
function show(req, res) {
	var vehicle = req.user.vehicles.id(req.params.id);
	res.render('vehicles/show', { user: req.user, vehicle });
}

// check if need to clear default parameters with for in loop [x]
// add error handling code? + data validation
function create(req, res) {
	req.user.vehicles.push(req.body);
	req.user.save(function(err) {
		res.redirect('/vehicles');
	});
}

// .remove() is deprecated --> can approach this another way? --> req.user?
function dlte(req, res) {
	req.user.vehicles.id(req.params.id).remove();
	req.user.save(function(err) {
		res.redirect('/vehicles');
	});
}