(function(angular) {
    'use strict';
    angular.module('eroMartin.keywordRepeaterDirective', []).directive('keywordRepeater', KeywordRepeaterDirectiveFunc);

    KeywordRepeaterDirectiveFunc.$inject = ['MongoService', '$routeParams', 'DateService'];

    function KeywordRepeaterDirectiveFunc(MongoService, $routeParams, DateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordrepeater.html',
            link: function(scope, elements, attributes) {
                scope.category = $routeParams.cat;
                MongoService.getByCat(scope.category).then(function(videos) {
                    videos.map(function(video) {
                        angular.extend(video, {
                            date: DateService.formatDate(video.date)
                        });

                        // stupid hack
                        if (video.title.length > 24)
                            angular.extend(video, {
                                title: video.title.substring(0, 24) + '...'
                            });
                    });

                    scope.videos = videos;
                });
            }
        };
    }
})(window.angular);