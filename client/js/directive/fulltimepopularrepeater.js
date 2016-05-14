(function (angular) {
    'use strict';
    angular.module('eroMartin.fulltimePopularVideoRepeaterDirective', []).directive('fulltimePopularVideoRepeater', FulltimePopularVideoRepeaterDirectiveFunc);

    FulltimePopularVideoRepeaterDirectiveFunc.$inject = ['MongoService', 'DateService'];

    function FulltimePopularVideoRepeaterDirectiveFunc(MongoService, DateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_fulltimepopularrepeater.html',
            // or directive controller?
            link: function (scope, elements, attributes) {
                MongoService.getFulltimePopularById().then(function (videos) {
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

                    scope.fulltimepopularvideos = videos;
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
