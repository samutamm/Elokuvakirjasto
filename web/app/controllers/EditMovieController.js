angular.module('ElokuvaApp').controller('EditMovieController', function (FirebaseService, $routeParams, $scope, $location) {
    
    FirebaseService.getMovie($routeParams.id, function (movie) {
        $scope.movie = movie;
    });
    
    $scope.newOne = false;

    $scope.returnToShow = function () {
        var wordEditLength = '/edit'.length;
        var newPath = $location.path().substring(0, $location.path().length - wordEditLength);
        $location.path(newPath);
    };

    $scope.save = function (movie) {
        var fieldsInMovieJson = 7;
        //debugger;
        if (Object.keys(movie).length === fieldsInMovieJson) {
            FirebaseService.updateMovie(movie);
            $scope.returnToShow();
        }
    };
});

