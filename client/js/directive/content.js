(function(angular) {
    'use strict';
    angular.module('eroMartin.contentDirective', []).directive('content', ContentDirectiveFunc);

    // ContentDirectiveFunc.$inject = ['$scope'];

    function ContentDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_content.html'
        };
    }
})(window.angular);