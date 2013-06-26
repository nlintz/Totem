# window.App = angular.module('myApp', ['ngResource'])
app = angular.module('myApp', ['demoController'])
app.config ($routeProvider, $locationProvider) ->
  $locationProvider.html5Mode(true);
  $routeProvider.when("/",
    {
      templateUrl: "assets/pages/partials/home_controls.html"
      controller: 'demoController'
    }
  ).when("/products/business",
    {
      templateUrl: "../assets/pages/partials/business_controls.html"
      controller: 'demoController'
    }
  ).when("/products/search",
    {
      templateUrl: "../assets/pages/partials/search_controls.html"
      controller: 'demoController'
    }
  )