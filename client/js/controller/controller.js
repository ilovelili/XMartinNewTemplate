(function(angular) {
    'use strict';

    var app = angular.module('eroMartin.controllers', []);

    app.controller('VideoDetailCtrl', VideoDetailCtrl);
    VideoDetailCtrl.$inject = ['$scope', '$routeParams', '$sce', '$window', '$timeout', 'MongoService', 'DateService'];
})(window.angular);

function VideoDetailCtrl($scope, $routeParams, $sce, $window, $timeout, MongoService, DateService) {
    MongoService.getById($routeParams.id).then(function(video) {
        angular.extend(video, {
            date: DateService.formatDate(video.date)
        });

        $scope.video = video;
        resloveIframeResponsive($scope, $sce, $timeout);

        // register onresize event
        angular.element($window).bind('resize', function() {
            resloveIframeResponsive($scope, $sce, $timeout);
            // manuall $digest required as resize event
            // is outside of angular
            $scope.$digest();
        });
    });
}

function resloveIframeResponsive($scope, $sce, $timeout) {
    // very ugly iframe responsive hack
    var width = Math.min($(document.body).width(), 728),
        video = $scope.video;

    var responsiveLink = video.link.replace('{{width}}', width).replace('{{height}}', width / 728 * 500);
    $scope.trustedLink = $sce.trustAsHtml(responsiveLink);

    // iframe css
    $timeout(function() {
        var iframe = $(".video_wrapper .video iframe");
        if (iframe) {
            iframe.addClass('player');
        }
    }, 320);
}
