angular.module('ElokuvaApp').controller('ListMoviesController', function(WindowDialogService, FirebaseService, $scope, $location) {
    $scope.movies = FirebaseService.getMovies();   
    
    $scope.remove = function(index) {
        if(WindowDialogService.confirm("Are you sure?")) {
            FirebaseService.removeMovie(index);
            $location.path('/movies');
        }
    } 
});