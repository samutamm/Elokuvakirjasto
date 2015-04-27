angular.module('ElokuvaApp').config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                redirectTo: '/movies'
            })
            .when('/login', {
                templateUrl: 'templates/loginForm.html',
                controller: 'UserController'
            })
            .when('/new', {
                templateUrl: "templates/movieForm.html",
                controller: "AddMovieController",
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies', {
                templateUrl: "templates/listMovies.html",
                controller: "ListMoviesController",
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id', {
                templateUrl: "templates/showMovie.html",
                controller: "ShowMovieController",
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id/edit', {
                templateUrl: 'templates/movieForm.html',
                controller: 'EditMovieController',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
});