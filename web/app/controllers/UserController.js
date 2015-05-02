angular.module('ElokuvaApp').controller('UserController', function ($scope, $location, AuthenticationService) {
    $scope.showRegister = false;
    $scope.showLogin = false;
    
    $scope.logIn = function () {
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function () {
                    $location.path('/movies');
                })
                .catch(function () {
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!'
                });
    }

    $scope.register = function () {
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function () {
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                            .then(function () {
                                $location.path('/movies');
                            });
                })
                .catch(function () {
                    $scope.message = 'Tapahtui virhe! Yritä uudestaan';
                });
    }
    
    $scope.toggleForm = function(scopeVariable) {
        if (scopeVariable == 'showLogin') {
            $scope.showLogin = true;
            $scope.showRegister = false;
        } else {
            $scope.showLogin = false;
            $scope.showRegister = true;
        }
        $scope.message = "";
    }
});