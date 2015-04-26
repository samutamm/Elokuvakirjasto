angular.module('ElokuvaApp').controller('ShowMovieController', function(FirebaseService, $scope, $routeParams) {
    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
});