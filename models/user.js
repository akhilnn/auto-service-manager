var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: String,
	phone: {
		type: String,
		match: /\d\d\d/
		// lookup to see if /\d{10}/ RegExp is correct for ### ### ####
	},
	address: String,
	avatar: String, // do this if have time
	googleId: String
},{
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);

// ask about embedding vs referencing?
// will have to create a separate user form for detail entry?