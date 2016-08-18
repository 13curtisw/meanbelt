app.factory('userFactory', ['$http', function($http) {
	function UserConstructor() {
		console.log("making factory")
		var self = this
		this.users = []
		this.login = function(name, cb){
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/login', {name: name}).then(function(data){
              		if(data.data.hasOwnProperty("name")){
		                self.loggedUser = data.data
		                console.log(self.loggedUser)
		            }
		            cb(data.data)
		        })
			}
		}
		this.getLoggedUser = function(cb){
			$http.get('http://localhost:8000/loggedinuser').then(function(data){
				console.log(data)
          		if(data.data.hasOwnProperty("name")){
	                self.loggedUser = data.data
	            } else {
	            	self.loggedUser = {error: "not logged in"}
	            }
	            console.log(self.loggedUser)
	            cb(self.loggedUser)
			})
		}
		this.getUser = function(id, cb){
			$http.post('http://localhost:8000/user', {userid: id}).then(function(data){
				console.log(data)
				cb(data.data)
			})
		}
		this.logout = function(cb){
			if (typeof(cb) === 'function') {  
				$http.post('http://localhost:8000/logout').then(function(data){
		            cb(data.data)
		        })
			}
		}
	}
		return (new UserConstructor());
}]);

