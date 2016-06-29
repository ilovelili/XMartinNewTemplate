(function (angular) {
    'use strict';
    angular.module('eroMartin.googleanalyticsDirective', []).directive('googleAnalyticsYagi', GoogleAnalyticsDirectiveFunc);

    // GoogleAnalyticsDirectiveFunc.$inject = ['$scope'];

    function GoogleAnalyticsDirectiveFunc() {
        return {
            restrict: 'E',
            link: function (scope, element, attributes) {
                angular.element(document).ready(
                    function () {
                        (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date(); a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                        ga('create', 'UA-72787489-1', 'auto');
                        ga('send', 'pageview');
                    });
            }
        }
    }
})(window.angular);
