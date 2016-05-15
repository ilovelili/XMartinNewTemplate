(function (angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);
    NativeAdSpotFunc.$inject = [];

    function NativeAdSpotFunc() {
        return {
            restrict: 'E',
            templateUrl: 'partial/_nativeadspot.html',
            // use parent scope
            scope: false,
            link: function (scope) {
                scope.overCap = function (event) {
                    return scope.videos && scope.limit >= scope.videos.length;
                };
            },
        };
    }
})(window.angular);