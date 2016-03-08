(function(angular) {
    'use strict';
    angular.module('eroMartin.contentRepeaterDirective', []).directive('contentRepeater', ContentRepeaterDirectiveFunc);

    ContentRepeaterDirectiveFunc.$inject = ['MongoService', 'dateService'];

    function ContentRepeaterDirectiveFunc(MongoService, dateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_contentrepeater.html',
            // or directive controller?
            link: function(scope, elements, attributes) {
                MongoService.getById().then(function(videos) {
                    videos.map(function(video) {
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
