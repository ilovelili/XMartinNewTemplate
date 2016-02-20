(function(angular) {
    'use strict';
    angular.module('eroMartin.controllers').controller('VideoListCtrl', VideoListCtrl);

    VideoListCtrl.$inject = ['$scope', 'MongoService'];
    function VideoListCtrl($scope, MongoService) {
        MongoService.query().$promise.then(function(videos) {
            $scope.videos = videos;
        });
    }
})(window.angular);