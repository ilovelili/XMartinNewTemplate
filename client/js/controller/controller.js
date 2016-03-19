(function(angular) {
    'use strict';

    var app = angular.module('eroMartin.controllers', []);

    app.controller('VideoDetailCtrl', VideoDetailCtrl);
    VideoDetailCtrl.$inject = ['$scope', '$routeParams', '$sce', 'MongoService', 'DateService'];
})(window.angular);

function VideoDetailCtrl($scope, $routeParams, $sce, MongoService, DateService) {
    MongoService.getById($routeParams.id).then(function(video) {
        angular.extend(video, {
            date: DateService.formatDate(video.date)
        });

        $scope.video = video;
        // very ugly iframe responsive hack
        var width = Math.min($(document.body).width(), 728);
        video.link = video.link.replace('{{width}}', width).replace('{{height}}', width / 728 * 500);
        $scope.trustedLink = $sce.trustAsHtml(video.link);
    });
}