TotemApp = angular.module('TotemApp', 
	['Controllers', 'Services', 'ui']
);

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/splash', { templateUrl: '/assets/splash.html', controller: 'SplashController' } )
  $routeProvider.when('/build/:totemFlowId', { templateUrl: '/templates/build.html', controller: 'BuildController' } )
  $routeProvider.otherwise({ redirectTo: '/build/:totemFlowId' })
])