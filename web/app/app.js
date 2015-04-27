var ElokuvaApp = angular.module('ElokuvaApp', ['firebase', 'ngRoute']);

ElokuvaApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);