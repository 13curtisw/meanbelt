app.factory('pollFactory', ['$http', function($http) {
	function PollConstructor() {
		var self = this
		this.getSurveys = function(cb){
			if (typeof(cb) === 'function') {  
				$http.get('http://localhost:8000/surveys').then(function(data){
		            cb(data.data)
		        })
			}
		}
		this.create = function(newsurvey, cb){
			console.log(newsurvey)
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/surveys', newsurvey).then(function(data){
					cb(data.data)
				})
			}
		}
		this.getSurvey = function(id, cb){
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/survey', {surveyid: id}).then(function(data){
					cb(data.data)
				})
			}
		}
		this.vote = function(body, cb){
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/vote', body).then(function(data){
					cb(data.data)
				})
			}
		}
		this.delete = function(id, cb){
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/delete', {surveyid: id}).then(function(data){
					cb(data.data)
				})
			}	
		}
		
	}
		return (new PollConstructor());
}]);

