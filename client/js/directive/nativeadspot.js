(function(angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);

    function NativeAdSpotFunc() {
        return {
            restrict: 'E',
            templateUrl: 'partial/_nativeadspot.html',
            // use parent scope
            scope: false,
            link: function(scope) {
                // init
                scope.limit = 15;
                scope.extendLimit = function(event) {
                    scope.limit += 8;
                    event.preventDefault();
                };
                scope.overCap = function(event) {
                    return scope.videos && scope.limit >= scope.videos.length;
                };
            },
        };
    }
})(window.angular);