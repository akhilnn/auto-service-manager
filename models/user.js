var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
	type: { type: String, enum: ['Routine', 'Repair', 'Recall'], required: true },
	title: { type: String, required: true },
	detail: String,
	servDate: { type: Date, required: true },
	mileage: { type: Number, required: true, min: 0 },
	dealership: { type: Schema.Types.ObjectId, ref: 'Dealership' }
},{
	timestamps: true
});

var vehicleSchema = new Schema({
	vin: { type: String, required: true, minlength: 17, maxlength: 17, uppercase: true },
	make: { type: String, required: true },
	model: { type: String, required: true },
	year: { type: Number, required: true, min: 1950, max: 2030 },
	mileage: { type: Number, required: true, min: 0 },
	services: [serviceSchema],
	// dealership: { type: Schema.Types.ObjectId, ref: 'Dealership' } // FUTURE WORK
},{
	timestamps: true
});

var userSchema = new Schema({
	name: String,
	email: String,
	// phone: { type: String, match: /^[1-9]\d{2}-\d{3}-\d{4}/ }, // FUTURE WORK
	// address: String, // FUTURE WORK
	// avatar: String, // FUTURE WORK
	googleId: String,
	vehicles: [vehicleSchema]
},{
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);

