angular.module("ElokuvaApp").directive('elokuvaNavBar', function () {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "templates/directives/elokuvaNavBar.html",
        controller: function ($timeout, $rootScope, $scope, $location, AuthenticationService) {
            $scope.isPage = function (name) {
                // /\/notes($|\/)/
                return new RegExp("/" + name + "($|/)").test($location.path());
            };

            $scope.isLoggedIn = function () {
                debugger;
                return AuthenticationService.checkLoggedIn() != undefined;
            }

            $scope.goToLogIn = function () {
                $location.path('/login');
            }

            $scope.goToLogOut = function () {
                $rootScope.logOut();

                $timeout(function () {
                    $location.path('/');
                }, 0);
            }

        }

    };
});

