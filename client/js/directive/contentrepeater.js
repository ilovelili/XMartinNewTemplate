(function (angular) {
    'use strict';
    angular.module('eroMartin.contentRepeaterDirective', []).directive('contentRepeater', ContentRepeaterDirectiveFunc);

    ContentRepeaterDirectiveFunc.$inject = ['DateService', 'UseragentService', '$location', '$timeout'];

    function ContentRepeaterDirectiveFunc(DateService, UseragentService, $location, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'partial/inner/_contentrepeater.html',
            scope: {
                query: '&',
                limit: '=',
                domain: '@',
            },
            link: function (scope, elements, attributes) {
                $timeout(function () {
                    scope.videos = [];
                    scope.query().then(function (videos) {
                        videos.map(function (video) {
                            angular.extend(video, {
                                date: DateService.formatDate(video.date)
                            });

                            // stupid hack
                            if (video.title.length > 24) {
                                angular.extend(video, {
                                    title: video.title.substring(0, 24) + '...',
                                });
                            }
                        });

                        scope.videos = videos;
                        scope.pathPattern = (function () {
                            switch (scope.domain) {
                                case 'newcoming':
                                    return '/video/';
                                case 'weeklypopular':
                                    return '/weeklypopularvideo/';
                                case 'monthlypopular':
                                    return '/monthlypopularvideo/';
                                case 'fulltimepopular':
                                    return '/fulltimepopularvideo/';
                                default:
                                    return '/video/';
                            }
                        })();
                        scope.go = function (path) {
                            $location.url(path);
                        };
                    });
                }, 0);
            },
        };
    }
})(window.angular);
