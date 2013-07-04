TotemApp = angular.module('TotemApp', [])

# Sets up routing
TotemApp.config(['$routeProvider', ($routeProvider) ->
  # Route for '/post'
  $routeProvider.when('/post', { templateUrl: '/assets/homeIndex.html', controller: 'PostCtrl' } )

  # Default
  $routeProvider.otherwise({ templateUrl: '/assets/homeIndex.html', controller: 'IndexCtrl' } )

])