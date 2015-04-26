angular.module('ElokuvaApp').config(function($routeProvider) {
    $routeProvider
            .when('/', {
                redirectTo: '/movies'
            })
            .when('/new', {
                templateUrl: "templates/addMovie.html",
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
});