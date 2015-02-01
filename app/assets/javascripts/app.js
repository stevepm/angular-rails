myApp = angular.module('myApp', [
    'templates',
    'ngRoute',
    'controllers'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "index.html",
            controller: "RecipesController"
        });
}]);

controllers = angular.module('controllers',[]);
controllers.controller("RecipesController", ['$scope', function($scope){

}]);