describe("RecipeController", function () {
    var ctrl, fakeRecipe, httpBackend, recipeId, routeParams, scope, setupController, flash;
    scope = null;
    flash = null;
    ctrl = null;
    routeParams = null;
    httpBackend = null;
    recipeId = 42;
    fakeRecipe = {
        id: recipeId,
        name: "Baked Potatoes",
        instructions: "Pierce potato with fork, nuke for 20 minutes"
    };
    setupController = function (recipeExists) {
        if (recipeExists == null) {
            recipeExists = true;
        }
        inject(function ($location, $routeParams, $rootScope, $httpBackend, $controller, _flash_) {
            var location;
            scope = $rootScope.$new();
            location = $location;
            httpBackend = $httpBackend;
            routeParams = $routeParams;
            routeParams.recipeId = recipeId;
            flash = _flash_;

            var request, results;

            request = new RegExp("\/recipes/" + recipeId);

            results = recipeExists ? [200, fakeRecipe] : [404];

            httpBackend.expectGET(request).respond(results[0], results[1]);

            ctrl = $controller('RecipeController', {
                $scope: scope
            });
        });
    };
    beforeEach(function () {
        module("myApp")
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('controller initialization', function () {
        describe('recipe is found', function () {
            beforeEach(function () {
                setupController()
            });
            it('loads the given recipe', function () {
                httpBackend.flush();
                expect(scope.recipe).toEqualData(fakeRecipe);
            });
        });
        describe('recipe is not found', function () {
            beforeEach(function () {
                setupController(false)
            });
            it('loads the given recipe', function () {
                httpBackend.flush();
                expect(scope.recipe).toBe(null);
                expect(flash.error).toBe("There is no recipe with ID " + recipeId);
            });
        });
    });


});