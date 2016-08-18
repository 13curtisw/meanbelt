app.controller('pollController', ['$scope','userFactory', 'pollFactory', '$location', '$routeParams', function($scope, userFactory, pollFactory, $location, $routeParams) {
	console.log("poll controller loaded")
	userFactory.getLoggedUser(function(data){
		if(data.hasOwnProperty("error")){
			$location.url('/')
		} else {
			$scope.user = data
		}
	})
	pollFactory.getSurvey($routeParams.id, function(data){
		$scope.survey = data
	})
	$scope.vote = function(option){
		console.log("voting")
		pollFactory.vote({option: option, surveyid: $scope.survey._id}, function(data){
			pollFactory.getSurvey($routeParams.id, function(data){
				$scope.survey = data
			})
		})

	}
}]);