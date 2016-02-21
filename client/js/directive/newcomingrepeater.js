(function(angular) {
    'use strict';
    angular.module('eroMartin.newcomingRepeaterDirective', []).directive('newcomingRepeater', NewcomingRepeaterDirectiveFunc);

    NewcomingRepeaterDirectiveFunc.$inject = ['MongoService'];

    function NewcomingRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_newcomingrepeater.html',
            scope: {
                limit: '='
            },
            link: function(scope, elements, attributes) {                
                MongoService.getById().query().$promise.then(function(videos) {
                    // sort by date to make sure the latest will be shown                   
                    scope.videos = videos.sort(function(video1, video2) {
                        return new Date(video1.date).getTime() > new Date(video2.date).getTime();
                    });
                });
            }
        };
    }
})(window.angular);