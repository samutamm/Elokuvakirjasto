angular.module('ElokuvaApp').config(function($routeProvider) {
    $routeProvider
            .when('/', {
                redirectTo: '/movies'
            })
            .when('/new', {
                templateUrl: "templates/movieForm.html",
                controller: "AddMovieController"
            })
            .when('/movies', {
                templateUrl: "templates/listMovies.html",
                controller: "ListMoviesController"
            })
            .when('/movies/:id', {
                templateUrl: "templates/showMovie.html",
                controller: "ShowMovieController"
            })
            .when('/movies/:id/edit', {
                templateUrl: ''
            })
});