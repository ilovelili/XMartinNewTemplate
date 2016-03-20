(function(angular) {
    'use strict';
    angular.module('eroMartin.sidemenuDirective', []).directive('sideMenu', SideMenuDirectiveFunc);

    // SideMenuDirectiveFunc.$inject = ['$scope'];

    function SideMenuDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_sidemenu.html'
        };
    }
})(window.angular);