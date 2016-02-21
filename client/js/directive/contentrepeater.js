(function(angular) {
    'use strict';
    angular.module('eroMartin.contentRepeaterDirective', []).directive('contentRepeater', ContentRepeaterDirectiveFunc);

    ContentRepeaterDirectiveFunc.$inject = ['MongoService'];

    function ContentRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_contentrepeater.html',
            
            link: function(scope, elements, attributes) {
                MongoService.getById().query().$promise.then(function(videos) {
                    videos.map(function(video) {
                        video.categories = video.category.split(' ');
                    });

                    scope.videos = videos;
                });
            }
        };
    }
})(window.angular);
