Services = angular.module('Services', ['ngResource']);

Services.factory('TotemFlows', ['$resource', function($resource){
	return $resource('/totem_flows/:totemFlowId');
}]);

Services.factory('TotemBlocks', ['$resource', function($resource){
	return $resource('/totem_blocks/:totemFlowId');
}]);