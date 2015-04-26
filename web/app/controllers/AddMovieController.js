angular.module('ElokuvaApp').controller('AddMovieController', function (FirebaseService, $scope, $location) {
    $scope.movie = {};

    $scope.addMovie = function (movie) {
        if (Object.keys(movie).length == 5) {
            FirebaseService.addMovie(movie);
            $scope.movie = {};
            $location.path('/movies');
        }
    };
});