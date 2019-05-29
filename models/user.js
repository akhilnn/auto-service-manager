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
	vin: { type: String, required: true },
	make: { type: String, required: true },
	model: { type: String, required: true },
	year: { type: Number, required: true, min: 1950, max: 2030 },
	mileage: { type: Number, required: true, min: 0 },
	services: [serviceSchema],
	dealership: { type: Schema.Types.ObjectId, ref: 'Dealership' }
},{
	timestamps: true
});

var userSchema = new Schema({
	name: String,
	email: String,
	phone: { type: String, match: /^[1-9]\d{2}-\d{3}-\d{4}/ },
	address: String,
	avatar: String,
	googleId: String,
	vehicles: [vehicleSchema]
},{
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);

// add code to handle avatar icon
// will have to create a separate user form for detail entry?

