(function(angular) {
    'use strict';
    angular.module('eroMartin.newcomingRepeaterDirective', []).directive('newcomingRepeater', NewcomingRepeaterDirectiveFunc);

    // NewcomingRepeaterDirectiveFunc.$inject = ['$scope'];

    function NewcomingRepeaterDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_newcomingrepeater.html'
        };
    }
})(window.angular);