ElokuvaApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://elokuvakirjasto-samu.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }

    this.addMovie = function (data) {
        movies.$add(data);
    }

    this.removeMovie = function(index) {
        movies.$remove(movies[index]);
    }
    
    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    }
    
    this.updateMovie = function(movie) {
        movies.$save(movie);
    };
});
