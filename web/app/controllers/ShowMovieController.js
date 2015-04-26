angular.module('ElokuvaApp').controller('ShowMovieController', function(FirebaseService, $scope, $routeParams, $location) {
    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
    
    $scope.edit = function() {
        $location.path($location.path() + '/edit');
    }
});