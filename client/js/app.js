(function(angular) {
    'use strict';
    angular.module('eroMartin', [
        'ngTouch',
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'pascalprecht.translate', //ngTranslate
        'eroMartin.controllers',
        'eroMartin.services',
        'eroMartin.directives'
    ]).config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/videos', {
                templateUrl: 'partial/_list.html',
                // controller: 'VideoListCtrl'
            })
            .when('/videos/:id', {
                templateUrl: 'partial/_detail.html'
                //controller: 'VideoDetailCtrl'
            })
            /*.when('/videos/:name', {
                templateUrl: 'partial/_namelist.html',
                controller: 'VideoNameCtrl'
            }).when('/videos/:cat', {
                templateUrl: 'partial/_catlist.html',
                controller: 'VideoCategoryCtrl'
            })*/
            .otherwise({
                redirectTo: '/videos'
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
