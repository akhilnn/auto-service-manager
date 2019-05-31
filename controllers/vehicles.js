var User = require('../models/user'); // not required
var Dealership = require('../models/dealership');

module.exports = {
	index,
	show,
	create,
	dlte,
	update
}


function index(req, res) {
	res.render('vehicles/index', { user: req.user });
}


function show(req, res) {
	Dealership.find({}, function(err, dealerships) {
		var vehicle = req.user.vehicles.id(req.params.id);
		res.render('vehicles/show', { user: req.user, vehicle, dealerships });
	});
}


function create(req, res) {
	req.user.vehicles.push(req.body);
	req.user.save(function(err) {
		if (err) return res.render('vehicles/index', { user: req.user });
		res.redirect('/vehicles');
	});
}

// ADD Error Handling
function dlte(req, res) {
	req.user.vehicles.id(req.params.id).remove();
	req.user.save(function(err) {
		res.redirect('/vehicles');
	});
}

// ADD Error Handling
function update(req, res) {
	var vehicle = req.user.vehicles.id(req.params.id);
	vehicle.mileage = req.body.mileage;

	req.user.save(function(err) {
		res.redirect(`/vehicles/${req.params.id}`);
	});
}

