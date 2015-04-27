angular.module('ElokuvaApp').controller('ListMoviesController', function (OMDBService, WindowDialogService, FirebaseService, $scope, $location) {
    $scope.movies = FirebaseService.getMovies();

    $scope.remove = function (index) {
        if (WindowDialogService.confirm("Are you sure?")) {
            FirebaseService.removeMovie(index);
            $location.path('/movies');
        }
    }

    $scope.searchMovies = function (search) {
        OMDBService.findMovie(search.name, search.year).success(function (movies) {
            $scope.OMDBmovies = movies;
            if ($scope.OMDBmovies.Response === "False") {
                $scope.moviesFound = false;
            } else {
                search = {};
                $scope.moviesFound = true;
            }
            $scope.searchDone = true;
        });
    }
});