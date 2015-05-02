var ElokuvaApp = angular.module('ElokuvaApp', ['firebase', 'ngRoute', 'validation.match', 'cgNotify']);

ElokuvaApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

ElokuvaApp.run(function ($location, AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});