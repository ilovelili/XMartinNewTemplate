(function(angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);

    function NativeAdSpotFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_nativeadspot.html',
        	// use parent scope
            scope: false
        };
    }
})(window.angular);