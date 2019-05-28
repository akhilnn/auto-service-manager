var User = require('../models/user'); // is this necessary?

module.exports = {
	index,
	create,
	dlte
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

// .remove() is deprecated --> can approach this another way? --> req.user?
function dlte(req, res) {
	req.user.vehicles.id(req.params.id).remove();
	req.user.save(function(err) {
		res.redirect('/vehicles');
	});
}