(function (angular) {
    'use strict';
    angular.module('eroMartin.monthlyPopularVideoRepeaterDirective', []).directive('monthlyPopularVideoRepeater', MonthlyPopularVideoRepeaterDirectiveFunc);

    MonthlyPopularVideoRepeaterDirectiveFunc.$inject = ['MongoService', 'DateService'];

    function MonthlyPopularVideoRepeaterDirectiveFunc(MongoService, DateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_monthlypopularrepeater.html',
            // or directive controller?
            link: function (scope, elements, attributes) {
                MongoService.getMonthlyPopularById().then(function (videos) {
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

                    scope.monthlypopularvideos = videos;
                    // init
                    scope.limit = 14;
                    scope.extendLimit = function (event) {
                        scope.limit += 8;
                        event.preventDefault();
                    };
                });
            }
        };
    }
})(window.angular);
