TotemApp = angular.module('TotemApp', ['SplashControllers'])

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/splash', { templateUrl: '/assets/splash.html', controller: 'SplashController' } )
  $routeProvider.otherwise({ redirectTo: '/' })
])