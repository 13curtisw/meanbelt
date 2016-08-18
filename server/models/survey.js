var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SurveySchema = new mongoose.Schema({
	question: {
		type: String, 
		required: true,
		minlength: 8
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	optionone: {
		name: {
			type: String,
			required: true,
			minlength: 3
		},
		votes: Number
	},
	optiontwo: {
		name: {
			type: String,
			required: true,
			minlength: 3
		},
		votes: Number
	},
	optionthree: {
		name: {
			type: String,
			required: true,
			minlength: 3
		},
		votes: Number
	},
	optionfour: {
		name: {
			type: String,
			required: true,
			minlength: 3
		},
		votes: Number
	}

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

var Surveys = mongoose.model('surveys', SurveySchema);