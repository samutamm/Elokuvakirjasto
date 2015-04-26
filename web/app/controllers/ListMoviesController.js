angular.module('ElokuvaApp').controller('ListMoviesController', function(FirebaseService, $scope, $location) {
    $scope.movies = FirebaseService.getMovies();   
    
    $scope.remove = function(index) {
        if(confirm("Are you sure?")) {
            FirebaseService.removeMovie($scope.movies[index]);
            $location.path('/movies');
        }
    }
    
});