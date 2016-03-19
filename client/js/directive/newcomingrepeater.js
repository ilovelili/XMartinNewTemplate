(function(angular) {
    'use strict';
    angular.module('eroMartin.newcomingRepeaterDirective', []).directive('newcomingRepeater', NewcomingRepeaterDirectiveFunc);

    NewcomingRepeaterDirectiveFunc.$inject = ['MongoService', 'dateService'];

    function NewcomingRepeaterDirectiveFunc(MongoService, dateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_newcomingrepeater.html',
            // or directive controller?
            link: function(scope, elements, attributes) {
                MongoService.getById().then(function(videos) {
                    videos.map(function(video) {
                        angular.extend(video, {
                            date: dateService.formatDate(video.date)
                        });

                        // stupid hack
                        if (video.title.length > 24)
                            angular.extend(video, {
                                title: video.title.substring(0, 24) + '...'
                            });
                    });

                    scope.videos = videos;
                    // init
                    scope.limit = 14;
                    scope.extendLimit = function(event) {
                        scope.limit += 8;
                        event.preventDefault();
                    };
                });
            }
        };
    }
})(window.angular);
