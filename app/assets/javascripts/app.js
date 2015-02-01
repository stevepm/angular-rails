myApp = angular.module('myApp', [
    'templates',
    'ngRoute',
    'ngResource',
    'controllers',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "index.html",
            controller: "RecipesController"
        })
        .when('/recipes/:recipeId', {
            templateUrl: "show.html",
            controller: "RecipeController"
        });
}]);

controllers = angular.module('controllers', []);