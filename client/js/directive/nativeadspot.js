(function (angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);
    NativeAdSpotFunc.$inject = ['UseragentService'];

    function NativeAdSpotFunc(UseragentService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_nativeadspot.html',
            // use parent scope
            scope: false,
            link: function (scope) {
                scope.limit = scope.limit || /*(UseragentService.isPC ? 15 : 14)*/15;
                scope.extendLimit = scope.extendLimit || function (event) {
                    scope.limit += 8;
                    event.preventDefault();
                };
                scope.overCap = scope.overCap || function (event) {
                    return scope.videos && scope.limit >= scope.videos.length;
                };
            },
        };
    }
})(window.angular);