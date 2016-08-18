app.controller('newController', ['$scope','userFactory', 'pollFactory', '$location', function($scope, userFactory, pollFactory,$location) {
	console.log("new controller loaded")
	userFactory.getLoggedUser(function(data){
		if(data.hasOwnProperty("error")){
			$location.url('/')
		} else {
			$scope.user = data
		}
	})
	$scope.newsurvey = {}
	$scope.hasErrors = false
	
	$scope.create = function(){
		console.log("creating new survey")
		pollFactory.create({
			question: $scope.newsurvey.question, 
			userid: $scope.user._id, 
			optionone: $scope.newsurvey.optionone, 
			optiontwo: $scope.newsurvey.optiontwo, 
			optionthree: $scope.newsurvey.optionthree, 
			optionfour: $scope.newsurvey.optionfour
		}, 
		function(data){
			console.log("pollfactory response")
			console.log(data)
			if(data.hasOwnProperty("errors")){
				$scope.hasErrors = true
				$scope.errors = data.errors
			} else {
				$location.url('/dashboard')
			}
		})
	}
}]);