var Dealership = require('../models/dealership');

module.exports = {
	new: newDlrshp,
	create
}


function newDlrshp(req, res) {
	res.render('dealerships/new', { user: req.user });
}


function create(req, res) {
	Dealership.create(req.body, function(err, dealership) {
		if (err) return res.render('dealerships/new', { user: req.user });
		res.redirect('/vehicles');
	});
}

