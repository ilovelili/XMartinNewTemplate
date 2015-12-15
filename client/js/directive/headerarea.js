(function(angular) {
    'use strict';
    angular.module('eroMartin.headerareaDirective', []).directive('headerArea', HeaderAreaDirectiveFunc);

    // HeaderAreaDirectiveFunc.$inject = ['$scope'];

    function HeaderAreaDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_headerarea.html'
        };
    }
})(window.angular);
