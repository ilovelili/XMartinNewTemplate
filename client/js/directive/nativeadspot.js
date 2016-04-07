(function(angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);
    NativeAdSpotFunc.$inject = ['UseragentService'];

    function NativeAdSpotFunc(UseragentService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_nativeadspot.html',
            // use parent scope
            scope: false,
            link: function(scope) {
                // init
                if (UseragentService.isPC) {
                    scope.limit = 15;
                } else {
                    scope.limit = 14;
                }

                scope.extendLimit = function(event) {
                    scope.limit += 16;
                    event.preventDefault();
                };
                scope.overCap = function(event) {
                    return scope.videos && scope.limit >= scope.videos.length;
                };
            },
        };
    }
})(window.angular);