(function(angular) {
    'use strict';
    angular.module('eroMartin.newcomingRepeaterDirective', []).directive('newcomingRepeater', NewcomingRepeaterDirectiveFunc);

    NewcomingRepeaterDirectiveFunc.$inject = ['MongoService'];

    function NewcomingRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_newcomingrepeater.html',
            link: function(scope, elements, attributes) {
                // todo: find by date
                MongoService.getById().query().$promise.then(function(videos) {
                    scope.videos = videos;
                });

                /*MongoService.getByDate().query().$promise.then(function(videos) {
                    scope.videos = videos;
                });*/
            }
        };
    }
})(window.angular);