TotemApp = angular.module('TotemApp', ['Controllers', 'Services', 'ui', 'ngResource']);

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/splash', { templateUrl: '/assets/splash.html', controller: 'SplashController' } )
  $routeProvider.when('/build/:totemFlowId', { templateUrl: '/templates/build.html', controller: 'BuildController' } )
  $routeProvider.when('/library', { templateUrl: '/templates/library.html', controller: 'LibraryController' } )
  $routeProvider.otherwise({ redirectTo: '/library' })
])