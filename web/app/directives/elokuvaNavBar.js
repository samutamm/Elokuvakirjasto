angular.module("ElokuvaApp").directive('elokuvaNavBar', function() {
  return {
    replace: true,
    restrict: "E",
    templateUrl: "templates/directives/elokuvaNavBar.html",
    controller: function($scope, $location) {
      $scope.isPage = function(name) {
        // /\/notes($|\/)/
        return new RegExp("/" + name + "($|/)").test($location.path());
      };
    }

  };
});

