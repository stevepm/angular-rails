controllers = angular.module('controllers');
controllers.controller("RecipesController",
    ['$scope', '$routeParams', '$location', '$resource',
        function ($scope, $routeParams, $location, $resource) {
            var keywords;

            $scope.search = function (keywords) {
                return $location.path('/').search('keywords', keywords);
            };

            var Recipe = $resource('/recipes/:recipeId', {
                recipeId: "@id",
                format: 'json'
            });

            if ($routeParams.keywords) {
                Recipe.query({
                    keywords: $routeParams.keywords
                }, function (results) {
                    $scope.recipes = results;
                });
            } else {
                $scope.recipes = [];
            }
        }]);