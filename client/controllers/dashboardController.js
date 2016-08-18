app.controller('dashboardController', ['$scope','userFactory', 'pollFactory', '$location', function($scope, userFactory, pollFactory,$location) {
	console.log("dashboard controller loaded")
	userFactory.getLoggedUser(function(data){
		if(data.hasOwnProperty("error")){
			$location.url('/')
		} else {
			$scope.user = data
		}
	})
	pollFactory.getSurveys(function(data){
		$scope.surveys = data.surveys
		console.log(data)
	})
	$scope.search = ""
	$scope.delete = function(surveyid){
		pollFactory.delete(surveyid, function(data){
			pollFactory.getSurveys(function(data){
				$scope.surveys = data.surveys
				console.log(data)
			})
		})
	}
	$scope.logout = function(){
		userFactory.logout(function(data){
			console.log("logged out!")
			$location.url("/")
		})
	}
}]);