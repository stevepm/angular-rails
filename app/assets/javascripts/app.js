myApp = angular.module('myApp', [
    'templates',
    'ngRoute',
    'ngResource',
    'controllers'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "index.html",
            controller: "RecipesController"
        });
}]);

controllers = angular.module('controllers', []);