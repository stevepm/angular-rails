controllers = angular.module('controllers');

controllers.controller("RecipeController", [
    '$scope', '$routeParams', '$resource', 'flash',
    function ($scope, $routeParams, $resource, flash) {
        var Recipe;

        Recipe = $resource('/recipes/:recipeId', {
            recipeId: "@id",
            format: 'json'
        });

        Recipe.get({
            recipeId: $routeParams.recipeId
        }, (function (recipe) {
            $scope.recipe = recipe;
        }), (function (httpResponse) {
            $scope.recipe = null;
            flash.error = "There is no recipe with ID " + $routeParams.recipeId;
        }));


    }]);