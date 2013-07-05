TotemApp = angular.module('TotemApp', [])

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/splash', { templateUrl: '/assets/splash.html', controller: 'PostCtrl' } )
  $routeProvider.otherwise({ redirectTo: '/' })
])