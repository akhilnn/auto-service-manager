var User = require('../models/user'); // is this necessary?

module.exports = {
	new: newService,
	create
}

// pass in req.user for dynamic nav bar
function newService(req, res) {
	res.render('services/new', { user: req.user, vehicleId: req.params.id });
}

// check if need to clear default parameters with for in loop [x]
function create(req, res) {
	var vehicle = req.user.vehicles.id(req.params.id);
	
	// add validation code if necessary

	vehicle.services.push(req.body);
	req.user.save(function(err) {
		if (err) return res.render('services/new', { user: req.user, vehicleId: req.params.id });
		console.log(vehicle);
		res.redirect(`/vehicles/${req.params.id}`);
	});
}