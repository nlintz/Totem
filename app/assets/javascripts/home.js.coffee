TotemApp = angular.module('TotemApp', ['Controllers', 'Services', 'ui', 'ngResource', 'ngSanitize']);

TotemApp.config(['$routeProvider', '$httpProvider', ($routeProvider, $httpProvider) ->
  $routeProvider.when('/splash', { templateUrl: '/assets/splash.html', controller: 'SplashController' } )
  $routeProvider.when('/build/:totemFlowId', { templateUrl: '/templates/build.html', controller: 'BuildController' } )
  $routeProvider.when('/library', { templateUrl: '/templates/library.html', controller: 'LibraryController' } )
  $routeProvider.otherwise({ redirectTo: '/library' })
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

])