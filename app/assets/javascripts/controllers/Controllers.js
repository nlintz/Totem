Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', 'TotemFlow', function($scope, TotemFlow) {
	$scope.flows = TotemFlow.query();
	$scope.firstFlow = TotemFlow.get({totemFlowId: 1});
}]);