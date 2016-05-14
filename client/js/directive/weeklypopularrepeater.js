(function (angular) {
    'use strict';
    angular.module('eroMartin.weeklyPopularVideoRepeaterDirective', []).directive('weeklyPopularVideoRepeater', WeeklyPopularVideoRepeaterDirectiveFunc);

    WeeklyPopularVideoRepeaterDirectiveFunc.$inject = ['MongoService', 'DateService'];

    function WeeklyPopularVideoRepeaterDirectiveFunc(MongoService, DateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_weeklypopularrepeater.html',            
            scope: {
                limit: '=',
            },
            // or directive controller?
            link: function (scope, elements, attributes) {
                MongoService.getWeeklyPopularById().then(function (videos) {
                    videos.map(function (video) {
                        angular.extend(video, {
                            date: DateService.formatDate(video.date)
                        });

                        // stupid hack
                        if (video.title.length > 24)
                            angular.extend(video, {
                                title: video.title.substring(0, 24) + '...'
                            });
                    });

                    scope.weeklypopularvideos = videos;
                    scope.extendLimit = function (event) {
                        scope.limit += 8;
                        event.preventDefault();
                    };
                });
            }
        };
    }
})(window.angular);
