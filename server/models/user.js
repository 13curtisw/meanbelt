var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	_surveys: [{
		type: Schema.Types.ObjectId,
		ref: 'surveys'
	}]

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

var Users = mongoose.model('users', UserSchema);