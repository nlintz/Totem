Services = angular.module('Services', ['ngResource']);

Services.factory('TotemFlow', ['$resource', function($resource){
	return $resource('/totem_flows/:totemFlowId');
}]);