(function(angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);

    function NativeAdSpotFunc() {
        return {
        	restrict: 'E',
        	templateUrl: 'partial/_nativeadspot.html',
        	scope: {
        		videos: '='
        	},
        	link: function(scope, elements, attributes) {
        		// watch more
        	}
        };
    }
})(window.angular);