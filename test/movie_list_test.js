describe('Movie list', function () {
    var controller, scope;
    var FirebaseServiceMock;
    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('ElokuvaApp');
        WindowDialogServiceMock = (function () {
            return {
                confirm: function () {
                    return true;
                }
            }
        })();
        FirebaseServiceMock = (function () {
            var movies = [
                {
                    "description": "Trés belle histoire.",
                    "director": "Aki Kaurismäki",
                    "location": "France",
                    "name": "Le Havre",
                    "year": "2009"
                },
                {
                    "description": "epic",
                    "director": "en muista",
                    "location": "New Zealand",
                    "name": "Taru Sormusten Herrasta",
                    "year": "2003"
                },
                {
                    "description": "Action",
                    "director": "Someone",
                    "location": "UK",
                    "name": "James Bond",
                    "year": "2998"
                }
            ]
            return {
                getMovies: function () {
                    return movies; 
                },
                addMovie: function (data) {
                    movies.push(data);
                },
                removeMovie: function (key) {
                    delete movies[key];
                }
            }
        })();
        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ListMoviesController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                WindowDialogService: WindowDialogServiceMock
            });
        });
    });
    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */
    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        var movies = scope.movies;
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
        expect(Object.keys(movies).length).toBe(3);
    });
    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        scope.remove(0);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
        //expect(Object.keys(scope.movies).length).toBe(1);
        //expect(movies[0]["name"]).toBe("Lion King");  
    });
});