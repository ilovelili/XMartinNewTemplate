(function(angular) {
    'use strict';
    angular.module('eroMartin.adspotDirective', []).directive('adSpot', AdSpot);

    function AdSpot() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_adspot.html'
        };
    }
})(window.angular);