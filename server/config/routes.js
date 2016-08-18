var users = require('../controllers/users.js');
console.log("routes loaded")
module.exports = function(app) {
	app.post('/login', users.login);
	app.get('/users', users.allusers);
	app.get('/surveys', users.allsurveys);
	app.post('/surveys', users.createSurvey);
	app.post('/vote', users.vote);
	app.post('/survey', users.getSurvey);
	app.post('/delete', users.deleteSurvey);
	app.post('/logout', users.logout);
	app.get('/loggedinuser', users.loggedInUser)
}