(function (angular) {
    'use strict';
    angular.module('eroMartin.naviDirective', []).directive('navi', NaviDirectiveFunc);

    // NaviDirectiveFunc.$inject = ['$scope'];

    function NaviDirectiveFunc() {
        return {
            restrict: 'E',
            templateUrl: 'partial/_navi.html',
            link: function (scope, element, attributes) {
                angular.element(document).ready(function () {
                    angular.element('.drawer').sidr({
                        name: 'sidr-right',
                        side: 'right'
                    });
                });
            }
        };
    }
})(window.angular);
