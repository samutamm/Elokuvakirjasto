var ElokuvaApp = angular.module('ElokuvaApp', ['firebase', 'ngRoute', 'validation.match']);

ElokuvaApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

ElokuvaApp.run(function(AuthenticationService, $rootScope){
  $rootScope.logOut = function(){
    console.log("logout!");
    AuthenticationService.logUserOut();
  };

  $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});