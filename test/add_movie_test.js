describe('Add movie', function () {
    var controller, scope;

    var FirebaseServiceMock;

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
                }
            }
        })();
        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        var movie = {
            "director": "Peter Jackson",
            "location": "New Zealand, USA",
            "name": "King kong",
            "year": "2005",
            "description": "Action film."
        };
        scope.save(movie);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });
    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        var movie = {
            "director": "Peter Jackson",
            "location": "New Zealand, USA",
            "name": "King kong",
            "year": "2005"
        };
        scope.save(movie);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});