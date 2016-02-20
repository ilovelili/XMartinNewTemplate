(function(angular) {
    'use strict';
    angular.module('eroMartin', [
            'ngTouch',
            'ngRoute',
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'pascalprecht.translate',
            'eroMartin.controllers',
            'eroMartin.services',
            'eroMartin.directives'
        ]).config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'partial/_home.html',
                    controller: 'MainCtrl'
                })                
                .when('/ranking', {
                    templateUrl: 'partial/_ranking.html'
                })
                .when('/keyword', {
                    templateUrl: 'partial/_keyword.html'
                })
                .when('/video/:id', {
                    templateUrl: 'partial/_detail.html'
                        //controller: 'VideoDetailCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }])
        // translate config
        .config(['$translateProvider',
            function($translateProvider) {
                $translateProvider.useStaticFilesLoader({
                    prefix: 'l10n/',
                    suffix: '.js'
                });

                // sanitize
                $translateProvider.useSanitizeValueStrategy('sanitize');

                // Tell the module what language to use by default
                $translateProvider.preferredLanguage('jp-JP');

                // Tell the module to store the language in the local storage
                $translateProvider.useLocalStorage();
            }
        ]);
})(window.angular);
