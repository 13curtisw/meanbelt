app.controller('loginController', ['$scope','userFactory', '$location', function($scope, userFactory, $location) {
  console.log("signin controller loaded")
  $scope.login = function(){
    	console.log("logging in")
    	userFactory.login($scope.name, function(data){
    		console.log("userfactory response")
    		console.log(data)
        $location.url('/dashboard')
      })
    }
  }]);