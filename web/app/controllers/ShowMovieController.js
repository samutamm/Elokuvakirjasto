angular.module('ElokuvaApp').controller('ShowMovieController', function(FirebaseService, $scope, $routeParams, $location) {
    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
    
    $scope.edit = function() {
        $location.path($location.path() + '/edit');
    }
    
    $scope.remove = function() {
        console.log("Remove");
        if(confirm("Are you sure?")) {
            FirebaseService.removeMovie($scope.movie);
            $location.path('/movies');
        }
    }
});