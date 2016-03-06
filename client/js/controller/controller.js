(function(angular) {
    'use strict';
    angular.module('eroMartin.controllers', []).controller('VideoDetailCtrl', VideoDetailCtrl);

    VideoDetailCtrl.$inject = ['$scope', '$routeParams', '$sce', 'MongoService'];

    function VideoDetailCtrl($scope, $routeParams, $sce, MongoService) {
        MongoService.getById($routeParams.id).then(function(video) {
            video.categories = video.category.split(' ');
            $scope.video = video;
            $scope.trustedLink = $sce.trustAsHtml(video.link);            
        });
    }
})(window.angular);
