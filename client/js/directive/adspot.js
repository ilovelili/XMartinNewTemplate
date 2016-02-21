(function(angular) {
    'use strict';
    angular.module('eroMartin.adspotDirective', []).directive('adSpot', AdSpotFunc);

    function AdSpotFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_adspot.html'
        };
    }
})(window.angular);