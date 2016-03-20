(function(angular) {
    'use strict';
    angular.module('eroMartin.sidemenuDirective', []).directive('sideMenu', SideMenuDirectiveFunc);

    // SideMenuDirectiveFunc.$inject = ['$scope'];

    function SideMenuDirectiveFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_sidemenu.html',
        	scope: true,
        	link: function(scope) {
        		scope.limit = 10;
        	},
        };
    }
})(window.angular);