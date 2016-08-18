var mongoose = require('mongoose');
var Users = mongoose.model('users');
var Surveys = mongoose.model('surveys');
console.log("controller loaded")

module.exports = {
	allusers: function(req,res){
		Users.find({}, function(err, allusers){
	    	res.json({users: allusers });
	    })
	},
	allsurveys: function(req,res){
		Surveys.find({}, function(err, allsurveys){
			res.json({surveys: allsurveys})
		}).populate('_user')
	},
	createSurvey: function(req,res){
		console.log(req.body)
		Users.findOne({_id: req.body.userid}, function(err, user){
			if(err || !user) return res.json({error: "user not found"});
			var optionone = {name: req.body.optionone, votes: 0}
			var optiontwo = {name: req.body.optiontwo, votes: 0}
			var optionthree = {name: req.body.optionthree, votes: 0}
			var optionfour = {name: req.body.optionfour, votes: 0}
			var survey = new Surveys({_user: user._id, question: req.body.question, optionone: optionone, optiontwo: optiontwo, optionthree: optionthree, optionfour: optionfour});
			survey.save(function(err){
				if(err) return res.json(err);

				user._surveys.push(survey._id);
				user.save(function(err){
					if(err) return res.json(err)

					console.log("successfully posted")
					res.json(survey)
				})
			})

		})
	},
	vote: function(req, res){
		Surveys.findOne({_id: req.body.surveyid}, function(err, survey){
			if(err || !survey) return res.json({error: "survey not found"});

			if(req.body.option == "optionone"){
				survey.optionone.votes += 1
			} else if(req.body.option == "optiontwo"){
				survey.optiontwo.votes += 1
			} else if(req.body.option == "optionthree"){
				survey.optionthree.votes += 1
			} else if(req.body.option == "optionfour"){
				survey.optionfour.votes += 1
			} else {
				return res.json({error: "option not found"})
			}

			survey.save(function(err){
				if(err) return res.json(err);

				console.log("succesfully voted")
				res.json(survey)
			})
		})
	},
	getSurvey: function(req, res){
		Surveys.findOne({_id: req.body.surveyid})
		.populate('_user')
		.exec(function(err, survey){
			if(err || !survey) return res.json({error: "survey not found"});
			console.log(survey)
			return res.json(survey)
		})
	},	
	// getUser: function(req, res){
	// 	Users.findOne({_id: req.body.userid}, function(err, user){
	// 		if(err || !user) return res.json({error: "user not found"});

	// 		return res.json(user)
	// 	})
	// },
	deleteSurvey: function(req, res){
		Surveys.remove({_id: req.body.surveyid}, function(err){
			if(err) return res.json({error: "survey not found"});

			return res.json({status: "removed"})
		})
	},
	login: function(req, res){
		Users.findOne({name: req.body.name}, function(err, user){
			if(err) return res.json({name: "error", message: "login failed"});
			if(!user){
				var newuser = new Users({name: req.body.name})
				newuser.save(function(err){
					if(err) return res.json(err);

					req.session.userid = newuser._id
					console.log("new user")
					console.log(req.session)
					return res.json(newuser)
				})
			} else {
				req.session.userid = user._id
				console.log("existing user")
				console.log(req.session)
				res.json(user)
			}


		})
	},
	logout: function(req, res){
		req.session.userid = ""
		res.json({status: "logged off"})
	},
	loggedInUser: function(req, res){
		console.log(req.session)
		Users.findOne({_id: req.session.userid}, function(err, user){
			if(err || !user) return res.json({error: "not logged in"});

			return res.json(user)
		})
	}
}










