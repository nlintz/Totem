TotemApp = angular.module('TotemApp', ['SplashControllers'])

TotemApp.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.otherwise({ redirectTo: '/' })
])