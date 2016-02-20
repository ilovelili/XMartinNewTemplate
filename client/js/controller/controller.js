(function(angular) {
    'use strict';
    angular.module('eroMartin.controllers', ['eroMartin.services']).controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
            $window.history.back();
        };
        $rootScope.go = function(path) {
            $location.url(path);
        };
    }]);
})(window.angular);