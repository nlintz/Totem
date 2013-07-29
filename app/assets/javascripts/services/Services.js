Services = angular.module('Services', ['ngResource']);

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

Services.service('PublicService', ['CurrentUser', 'Signout', 'TotemBlocks', 'TotemFlows', 'Users', function(CurrentUser, Signout, TotemBlocks, TotemFlows, Users){
	this.getCurrentUser = function(callback){
		CurrentUser.currentUser().then(function (user){
			callback(user.data)
		})	
	}
	this.signout = function(){
		Signout.signoutUser();
	};

}]);

Services.service('BuildService', ['TotemBlocks', 'TotemFlows', function(TotemBlocks, TotemFlows){
	this.buildTotemBlock = function(position, title, content, totemType){
		var blockTypes = ['monkey', 'bear', 'face']
		var totemBlock = {
			position: position,
			title: title,
			content: content,
			totem_type: blockTypes[ Math.floor( Math.random() * blockTypes.length ) ]
		}
		return totemBlock
	}

	this.createTotemBlock = function(userId, totemFlowId, callback){
		TotemBlocks.create({user_id:userId, totem_flow_id:totemFlowId}, function(totemBlock){
			callback(totemBlock)
		});
	}
	this.destroyTotemBlock = function(userId, totemFlowId, totemBlockId){
		TotemBlocks.delete({user_id: userId, totem_flow_id: totemFlowId, totem_block_id: totemBlockId})
	}

	this.getTotemBlocks = function(userId, totemFlowId, callback){
		TotemBlocks.query({user_id:userId, totem_flow_id:totemFlowId}, function(totemBlocks){
			callback(totemBlocks);
		})
	};
	this.getTotemFlow = function(userId, totemFlowId, callback){
		TotemFlows.get({user_id:userId, totem_flow_id:totemFlowId}, function(totemFlow){
			callback(totemFlow);
		})
	};
	this.updateTotemFlow = function(userId, totemFlowId, totemFlow){
        TotemFlows.update({user_id:userId, totem_flow_id:totemFlowId}, totemFlow)
	}
	this.updateTotemBlock = function(userId, totemFlowId, totemBlockId, totemBlock, callback){
        TotemBlocks.update({user_id:userId, totem_flow_id:totemFlowId, totem_block_id: totemBlockId}, totemBlock, function(totemBlock){
        	callback(totemBlock)
        })
	}
}])

Services.service('LibraryService', ['CurrentUser', 'Signout', 'TotemBlocks', 'TotemFlows', 'Users', function(CurrentUser, Signout, TotemBlocks, TotemFlows, Users){
	this.createTotemFlow = function(userId){
        TotemFlows.create({user_id:userId})
	}
	this.getCurrentUser = function(callback){
		CurrentUser.currentUser().then(function (user){
			callback(user)
			return user
		})	
	}
	this.getTotemFlows = function(userId, callback){
		TotemFlows.query({user_id: userId}, function(totemFlows){
			callback(totemFlows);
		})
	}
	this.signout = function(){
		Signout.signoutUser();
	};
}]);
