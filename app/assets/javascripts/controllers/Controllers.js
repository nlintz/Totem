Controllers = angular.module('Controllers', ['Services']);

Controllers.controller('SplashController', ['$scope', function($scope) {
    console.log('true')
    $scope.transition_to_login = "false";
    $scope.transition = function(){
    	$scope.hide_logo = 'hide-logo';
    	$scope.hide_logo_container = 'hide-logo-container';
    }
}]);

Controllers.controller('BuildController', ['$scope', 'TotemFlows', 'TotemBlocks', function($scope, TotemFlow, TotemBlocks) {
	$scope.items = TotemBlock.query();
	$scope.firstFlow = TotemFlow.get({totemFlowId: 1});
}]);