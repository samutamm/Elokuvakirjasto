angular.module('ElokuvaApp').controller('ListMoviesController', function (notify, OMDBService, WindowDialogService, FirebaseService, $scope, $location, currentAuth) {
    $scope.showRemoveButton = function() {
        return currentAuth != undefined;
    }
    
    $scope.movies = FirebaseService.getMovies();

    $scope.remove = function (index) {
        if (WindowDialogService.confirm("Are you sure?")) {
            FirebaseService.removeMovie(index);
            $location.path('/movies');
            notify('Movie removed!!');
        }
    }

    $scope.searchMovies = function (search) {
        OMDBService.findMovie(search.name, search.year).success(function (movies) {
            $scope.OMDBmovies = movies;
            if ($scope.OMDBmovies.Response === "False") {
                $scope.numberOfMovies = 0;
            } else {
                $scope.search = {};
                $scope.numberOfMovies = $scope.OMDBmovies.Search.length;
            }
            $scope.searchDone = true;
        });
    }
});