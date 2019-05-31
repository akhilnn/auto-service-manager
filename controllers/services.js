var User = require('../models/user'); // not required
var Dealership = require('../models/dealership');

module.exports = {
	new: newService,
	create,
	update
}


function newService(req, res) {
	Dealership.find({}, function(err, dealerships) {
		res.render('services/new', { user: req.user, vehicleId: req.params.id, dealerships });
	});
}

// ADD Error Handling
function create(req, res) {
	var vehicle = req.user.vehicles.id(req.params.id);
	vehicle.services.push(req.body);
	req.user.save(function(err) {
		// if (err) return res.render('services/new', { user: req.user, vehicleId: req.params.id });
		res.redirect(`/vehicles/${req.params.id}`);
	});
}

// ADD Error Handling
function update(req, res) {
	var service = req.user.vehicles.id(req.params.id).services.id(req.params.serviceId);
	service.detail = req.body.detail;
	
	req.user.save(function(err) {
		res.redirect(`/vehicles/${req.params.id}`);
	});
}

