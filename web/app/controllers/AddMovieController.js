angular.module('ElokuvaApp').controller('AddMovieController', function (FirebaseService, $scope, $location) {
    $scope.movie = {};
    $scope.newOne = true;

    $scope.save = function (movie) {
        if (Object.keys(movie).length == 5) {
            FirebaseService.addMovie(movie);
            $scope.movie = {};
            $location.path('/movies');
        }
    };
});