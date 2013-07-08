TotemApp = angular.module('TotemApp', ['SplashControllers'])

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/post', { templateUrl: '/assets/splash.html', controller: 'PostCtrl' } )
  $routeProvider.otherwise({ redirectTo: '/' })
])