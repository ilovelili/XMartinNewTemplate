(function(angular) {
    'use strict';
    angular.module('eroMartin.controllers', []).controller('VideoDetailCtrl', VideoDetailCtrl);

    VideoDetailCtrl.$inject = ['$scope', '$routeParams', '$sce', 'MongoService', 'dateService'];

    function VideoDetailCtrl($scope, $routeParams, $sce, MongoService, dateService) {
        MongoService.getById($routeParams.id).then(function(video) {
            angular.extend(video, {
                date: dateService.formatDate(video.date)
            });

            $scope.video = video;
            // very ugly iframe responsive hack
            var width = Math.min($(document.body).width(), 728);
            video.link = video.link.replace('{{width}}', width).replace('{{height}}', width / 728 * 500);
            $scope.trustedLink = $sce.trustAsHtml(video.link);
        });
    }
})(window.angular);
