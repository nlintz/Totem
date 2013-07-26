Services = angular.module('Services', ['ngResource']);

Services.factory('Users', ['$resource', '$http', function($resource, $http){
	var Users = {
		resource : $resource('/users/:user_id/',
			{
				user_id: '@user_id'
			},
			{
				getUser: {method: 'GET'},
				getUserTotemFlows: {method:'GET', isArray:true}
			}),

		}
	return Users
}]);


Services.factory('TotemFlows', ['$resource', function($resource){
	return $resource('/users/:user_id/totem_flows/:totem_flow_id', 
		{ 
			user_id: '@user_id',
			totem_flow_id: '@totem_flow_id'
		}, {
			create: {method: 'POST'},
			update: {method: 'PUT'}
		});
}]);

Services.factory('TotemBlocks', ['$resource', function($resource){
	return $resource('/users/:user_id/totem_flows/:totem_flow_id/totem_blocks/:totem_block_id', 
		{ 
			user_id: '@user_id',
			totem_flow_id: '@totem_flow_id',
			totem_block_id: '@totem_block_id' 
		}, {
			create: {method: 'POST'},
			update: {method: 'PUT'}
		});
}]);

Services.factory('Signout', ['$http', function($http){
	return {
	    signoutUser: function(){
        $http({
            method: 'DELETE',
            url:"/users/sign_out"
        }).
	     success(function(data, status, headers, config) {
	        location.reload(true);
	      }).
	      error(function(data, status, headers, config) {
	        location.reload(true);

	      });
	    }
	}
}]);

Services.factory('CurrentUser', ['$http', function($http) {
	var currentUser = {
		currentUser : function() {
		return $http({
			method: 'GET',
			url:"/users/getCurrentUser"
				}).success(function(data, status, headers, config) {
	  				return data
	  			}).error(function(data, status, headers, config) {
	  				return data
	  			})
		}
	}
	return currentUser
}]);

Services.service('BuildService', [function(){
	this.hi = 'hi'
}])