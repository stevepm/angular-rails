myApp = angular.module('myApp', [
    'templates',
    'ngRoute',
    'ngResource',
    'controllers',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
]);

myApp.config([
    '$routeProvider', 'flashProvider',
    function ($routeProvider, flashProvider) {
        flashProvider.errorClassnames.push("alert-danger");
        flashProvider.warnClassnames.push("alert-warning");
        flashProvider.infoClassnames.push("alert-info");
        flashProvider.successClassnames.push("alert-success");

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