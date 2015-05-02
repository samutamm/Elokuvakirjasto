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

            $scope.notLoggedIn = function () {
                //debugger;
                //console.log(AuthenticationService.checkLoggedIn().$$state.status);
                return AuthenticationService.checkLoggedIn().$$state.value == null;
            }

            $scope.goToLogIn = function () {
                $timeout(function () {
                    $location.path('/login');
                }, 0);
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

