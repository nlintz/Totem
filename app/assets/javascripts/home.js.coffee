TotemApp = angular.module('TotemApp', [])

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/post', { templateUrl: '/assets/homeIndex.html', controller: 'PostCtrl' } )
  $routeProvider.otherwise({ redirectTo: '/' })
])