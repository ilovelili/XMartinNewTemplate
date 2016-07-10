(function (angular) {
    'use strict';
    angular.module('eroMartin.nativeAdSpotDirective', []).directive('nativeAdSpot', NativeAdSpotFunc);
    NativeAdSpotFunc.$inject = ['UseragentService', '$timeout'];

    function NativeAdSpotFunc(UseragentService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_nativeadspot.html',
            replace: true,
            // use parent scope
            scope: false,
            link: function (scope) {
                $timeout(function () {
                    scope.limit = scope.limit || /*(UseragentService.isPC ? 15 : 14)*/15;
                    scope.extendLimit = scope.extendLimit || function (event) {
                        scope.limit += 8;
                        event.preventDefault();
                    };
                    scope.overCap = scope.overCap || function (event) {
                        return scope.videos && scope.limit >= scope.videos.length;
                    };
                }, 1000);
            },
        };
    }
})(window.angular);