(function(angular) {
    'use strict';
    angular.module('eroMartin.footerDirective', []).directive('pageFooter', FooterDirectiveFunc);

    // FooterDirectiveFunc.$inject = ['$scope'];

    function FooterDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_footer.html'
        };
    }
})(window.angular);