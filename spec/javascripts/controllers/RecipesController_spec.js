describe("RecipesController", function () {
    var ctrl, location, resource, routeParams, scope, setupController, httpBackend;
    scope = null;
    ctrl = null;
    location = null;
    resource = null;

    // access injected service later
    httpBackend = null;

    setupController = function (keywords, results) {
        return inject(function ($httpBackend, $location, $routeParams, $rootScope, $resource, $controller) {
            scope = $rootScope.$new();
            location = $location;
            resource = $resource;
            routeParams = $routeParams;
            routeParams.keywords = keywords;

            // capture the injected service
            httpBackend = $httpBackend;

            var request;

            if (results) {
                request = new RegExp("\/recipes.*keywords=" + keywords);
                httpBackend.expectGET(request).respond(results);
            }

            return ctrl = $controller('RecipesController', {
                $scope: scope,
                $location: location
            });
        });
    };

    beforeEach(function () {
        module("myApp")
    });
    beforeEach(function () {
        setupController()
    });
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('defaults to no recipes', function () {
        expect(scope.recipes).toEqualData([]);
    });

    describe("with keywords", function () {
        var keywords = 'foo';
        var recipes = [
            {
                id: 2,
                name: 'Baked Potatoes'
            },
            {
                id: 4,
                name: 'Potatoes Au Gratin'
            }
        ];

        beforeEach(function () {
            setupController(keywords, recipes);
            httpBackend.flush();
        });

        it("calls the back-end", function () {
            expect(scope.recipes).toEqualData(recipes);
        });
    });

    describe("search()", function () {
        beforeEach(function () {
            setupController();
        });

        it("redirects to itself with a keyword param", function () {
            var keywords = 'foo';
            scope.search(keywords);
            expect(location.path()).toBe('/');
            expect(location.search()).toEqualData({keywords: keywords});
        });
    });
});