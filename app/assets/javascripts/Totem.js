angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html'}).
      otherwise({redirectTo: '/phones'});
}]);