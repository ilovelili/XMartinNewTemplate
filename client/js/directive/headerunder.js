(function(angular) {
    'use strict';
    angular.module('eroMartin.headerunderDirective', []).directive('headerUnder', HeaderUnderDirectiveFunc);

    // HeaderAreaDirectiveFunc.$inject = ['$scope'];

    function HeaderUnderDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_headerunder.html'
        };
    }
})(window.angular);