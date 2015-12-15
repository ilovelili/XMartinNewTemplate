(function(angular) {
    'use strict';
    angular.module('eroMartin.contentRepeaterDirective', []).directive('contentRepeater', ContentRepeaterDirectiveFunc);

    // ContentRepeaterDirectiveFunc.$inject = ['$scope'];

    function ContentRepeaterDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_contentrepeater.html'
        };
    }
})(window.angular);