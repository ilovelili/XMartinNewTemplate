(function(angular) {
    'use strict';
    angular.module('eroMartin.controllers', ['eroMartin.services']).controller('VideoListCtrl', ['$scope', 'MongoService', function($scope, MongoService) {
        MongoService.getById().query().$promise.then(function(videos) {
            $scope.videos = videos;
        });
    }]);
})(window.angular);
