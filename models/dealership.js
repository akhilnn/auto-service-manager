var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dealershipSchema = new Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	website: String
},{
	timestamps: true
});

module.exports = mongoose.model('Dealership', dealershipSchema);

