Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', 'TotemFlows', 'TotemBlocks', function($scope, TotemFlow, TotemBlocks) {
	// $scope.items = TotemBlocks.query();
	$scope.items = [1,2,3,4,5,6,7,8]
	$scope.firstFlow = TotemFlow.get({totemFlowId: 1});
}]);