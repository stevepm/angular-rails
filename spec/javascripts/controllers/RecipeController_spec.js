describe("RecipeController", function () {
    var ctrl, fakeRecipe, httpBackend, recipeId, routeParams, scope, setupController, flash, location;
    location = null;
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
    setupController = function (recipeExists, recipeId) {
        if (recipeExists == null) {
            recipeExists = true;
        }
        if (recipeId == null){
            recipeId = 42
        }
        inject(function ($location, $routeParams, $rootScope, $httpBackend, $controller, _flash_) {
            scope = $rootScope.$new();
            location = $location;
            httpBackend = $httpBackend;
            routeParams = $routeParams;
            if (recipeId){
                routeParams.recipeId = recipeId;
            }
            flash = _flash_;

            var request, results;



            if (recipeId){
                request = new RegExp("\/recipes/" + recipeId);
                results = recipeExists ? [200, fakeRecipe] : [404];
                httpBackend.expectGET(request).respond(results[0], results[1]);
            }


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

    describe('create', function(){
        var newRecipe = {
            id: 42,
            name: 'Toast',
            instructions: 'put in toaster'
        };

        beforeEach(function(){
            setupController(false, false);
            request = new RegExp("\/recipes");
            httpBackend.expectPOST(request).respond(201, newRecipe);
        });

        it('posts to the backend', function(){
            scope.recipe.name = newRecipe.name;
            scope.recipe.instructions = newRecipe.instructions;
            scope.save();
            httpBackend.flush();
            expect(location.path()).toBe("/recipes/" + newRecipe.id);
        });
    });

    describe('update', function(){
        updatedRecipe = {
            name: 'Toast',
            instructions: 'put in toaster'
        };
        beforeEach(function(){
            setupController();
            httpBackend.flush();
            request = new RegExp("\/recipes/");
            httpBackend.expectPUT(request).respond(204);
        });
        it("posts to the backend", function(){
            scope.recipe.name = updatedRecipe.name;
            scope.recipe.instructions = updatedRecipe.instructions;
            scope.save();
            httpBackend.flush();
            expect(location.path()).toBe("/recipes/" + scope.recipe.id);
        });
    });

    describe('delete', function(){
        beforeEach(function(){
            setupController();
            httpBackend.flush();
            request = new RegExp("\/recipes/" + scope.recipe.id);
            httpBackend.expectDELETE(request).respond(204);
        });

        it("posts to the backend", function(){
            scope.delete();
            httpBackend.flush();
            expect(location.path()).toBe("/");
        })
    })


});