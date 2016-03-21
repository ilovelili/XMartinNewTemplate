(function(angular) {
    'use strict';

    angular.module('eroMartin.useragentService', [])
        .factory('UseragentService', ['$window', function($window) {
            return {
                get isMobile() {
                    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test($window.navigator.userAgent));
                },
                get isPC() {
                    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test($window.navigator.userAgent));
                },
            };
        }]);
})(window.angular);