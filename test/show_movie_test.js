describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('ElokuvaApp');

        FirebaseServiceMock = (function () {
            var movies = [
                {
                    "description": "Trés belle histoire.",
                    "director": "Aki Kaurismäki",
                    "location": "France",
                    "name": "Le Havre",
                    "year": "2009",
                    "id": "123",
                    "priority": "asdhad"
                }];
            return {
                getMovie: function (key, done) {
                    done(movies[key]);
                }
            }
        })();

        RouteParamsMock = (function () {
            return
            {
            return {
                id: "0"
                }
            }
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routePrams: RouteParamsMock
            });
        });
    });
    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */
    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
        expect(scope.movie.name).toBe("Le Havre");
    });
});