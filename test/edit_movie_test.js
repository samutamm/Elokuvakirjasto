describe('Edit movie', function () {
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
                },
                {
                    "description": "epic",
                    "director": "en muista",
                    "location": "New Zealand",
                    "name": "Taru Sormusten Herrasta",
                    "year": "2003",
                    "id": "1233",
                    "priority": "asdhad"
                },
                {
                    "description": "Action",
                    "director": "Someone",
                    "location": "UK",
                    "name": "James Bond",
                    "year": "2998",
                    "id": "1223",
                    "priority": "asdhad"
                }
            ]
            return {
                updateMovie: function (movie) {
                    var index;
                    for (var i = 0, max = movies.length; i < max; i++) {
                        if (movies[i].name === movie.name) {
                            index = i;
                        }
                    }
                    movies[i] = movie;
                },
                getMovie: function (key, done) {
                    done(movies[key]);
                }
            }
        })();

        RouteParamsMock = (function () {
            return {
                id: "0"
            }
        })();
        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'updateMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });
    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */
    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
        expect(scope.movie.name).toBe("Le Havre");
    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        var movieToEdit = scope.movie;
        movieToEdit.name = "Mies vailla menneisyyttä";
        scope.save(movieToEdit);
        expect(FirebaseServiceMock.updateMovie).toHaveBeenCalled();
        expect(scope.movie.name).toBe("Mies vailla menneisyyttä");
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        var movieToEdit = JSON.parse(JSON.stringify(scope.movie));
        delete movieToEdit['name'];
        scope.save(movieToEdit);
        expect(FirebaseServiceMock.updateMovie).not.toHaveBeenCalled();
        expect(scope.movie.name).toBe("Le Havre");
    });
});