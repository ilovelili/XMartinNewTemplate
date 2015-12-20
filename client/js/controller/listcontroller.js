(function (angular) {
    'use strict';
    angular.module('eroMartin.controllers', []).controller('VideoListCtrl', VideoListCtrl);

    //VideoListCtrl.$inject = ['$scope', 'MongoService'];
    /*function VideoListCtrl($scope, MongoService) {
        MongoService.getById().query().$promise.then(function (videos) {
            $scope.videos = videos;
        });
    }*/

    VideoListCtrl.$inject = ['$scope'];
    function VideoListCtrl($scope){
    	console.log('hit');
    }
})(window.angular);