(function (angular) {
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
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'partial/_home.html'
            })
            .when('/about', {
                templateUrl: 'partial/_about.html'
            })
            .when('/link', {
                templateUrl: 'partial/_link.html'
            })
            .when('/keyword/:cat', {
                templateUrl: 'partial/_keyword.html',
            })
            .when('/keyword', {
                templateUrl: 'partial/_keywords.html'
            })
            .when('/video/:id', {
                templateUrl: 'partial/_detail.html',
                controller: 'VideoDetailCtrl',
                resolve: {
                    query: function (MongoService, $routeParams) {
                        return function () { return MongoService.getById($routeParams.id) };
                    },
                },
            })
            .when('/weeklypopularvideo/:id', {
                templateUrl: 'partial/_detail.html',
                controller: 'VideoDetailCtrl',
                resolve: {
                    query: function (MongoService, $routeParams) {
                        return function () { return MongoService.getWeeklyPopularById($routeParams.id) };
                    },
                },
            })
            .when('/monthlypopularvideo/:id', {
                templateUrl: 'partial/_detail.html',
                controller: 'VideoDetailCtrl',
                resolve: {
                    query: function (MongoService, $routeParams) {
                        return function () { return MongoService.getMonthlyPopularById($routeParams.id) };
                    },
                },
            })
            .when('/fulltimepopularvideo/:id', {
                templateUrl: 'partial/_detail.html',
                controller: 'VideoDetailCtrl',
                resolve: {
                    query: function (MongoService, $routeParams) {
                        return function () { return MongoService.getFulltimePopularById($routeParams.id) };
                    },
                },
            })
            .otherwise({
                redirectTo: '/home'
            });
    }])
        // translate config
        .config(['$translateProvider',
            function ($translateProvider) {
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
        ])
        // rootscope register
        .run(['$rootScope', '$window', '$location', 'MongoService', function ($rootScope, $window, $location, MongoService) {
            $rootScope.back = function () {
                $window.history.back();
            };
            
            $rootScope.pathPattern = '/video/';
            $rootScope.go = function (path) {
                $location.url(path);
            };

            $rootScope.$on('$routeChangeSuccess', function (newVal, oldVal) {
                // hack: init navi bar
                var navi = $('.navbar-toggle');
                if (navi.attr('aria-expanded') === 'true') {
                    navi.click();
                }
                // scroll to top
                window.scrollTo(0, 0);
            });

            // aggregate is heavy so only run once
            MongoService.aggregateCat().then(function (cats) {
                cats.map(function (cat) {
                    angular.extend(cat, {
                        name: cat._id.cat,
                    });
                });

                $rootScope.aggregateCats = cats
                    .sort(function (cat1, cat2) {
                        if (cat1.count > cat2.count)
                            return -1;
                        if (cat1.count < cat2.count)
                            return 1;
                        return 0;
                    });
            });
        }]);
})(window.angular);
