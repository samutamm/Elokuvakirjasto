angular.module('ElokuvaApp').controller('ListMoviesController', function(FirebaseService, $scope, $location) {
    $scope.movies = FirebaseService.getMovies();
    
    
    $scope.showMovies = function() {
        console.log($scope.movies);
    };
    
});