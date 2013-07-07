SplashControllers = angular.module('SplashControllers', []);
SplashControllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.transition_to_login = 'btn-totem-animation'
    }
}]);