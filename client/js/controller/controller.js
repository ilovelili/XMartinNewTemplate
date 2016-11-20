(function (angular) {
    'use strict';

    var app = angular.module('eroMartin.controllers', []);
    app.controller('VideoDetailCtrl', VideoDetailCtrl);
    VideoDetailCtrl.$inject = ['$scope', '$sce', '$window', '$timeout', 'MongoService', 'DateService', 'UseragentService', 'query'];
})(window.angular);

function VideoDetailCtrl($scope, $sce, $window, $timeout, MongoService, DateService, UseragentService, query) {
    query().then(function (video) {
        if(!video._id) {
            $window.open('/', '_self');
        }

        angular.extend(video, {
            date: DateService.formatDate(video.date)
        });

        $scope.video = video;
        resloveIframeResponsive($scope, $sce, $timeout);

        // register onresize event
        angular.element($window).bind('resize', function () {
            resloveIframeResponsive($scope, $sce, $timeout);
            // manuall $digest required as resize event
            // is outside of angular
            $scope.$digest();
        });
    });

    $scope.$watch('video', function (newvalue, oldvalue, scope) {
        if (newvalue && newvalue != oldvalue) {
            var cats = scope.video.category;
            scope.videos = [];
            angular.forEach(cats, function (cat) {
                MongoService.getByCat(cat).then(function (videos) {
                    videos.map(function (video) {
                        angular.extend(video, {
                            date: DateService.formatDate(video.date)
                        });

                        // stupid hack
                        if (video.title.length > 24)
                            angular.extend(video, {
                                title: video.title.substring(0, 24) + '...'
                            });
                    });

                    scope.videos = scope.videos.concat(videos);
                    // remove duplicate by _id (consider use filter) and need check performance issue
                    var result = [];
                    angular.forEach(scope.videos, function (video) {
                        var ids = result.map(function (item) {
                            return item._id;
                        });

                        if (ids.indexOf(video._id) === -1 && video._id !== scope.video._id) {
                            result.push(video);
                        }
                    });

                    scope.videos = result;
                    scope.limit = scope.limit || /*(UseragentService.isPC ? 15 : 14)*/ 15;
                });
            });
        }
    });
}

function resloveIframeResponsive($scope, $sce, $timeout) {
    // very ugly iframe responsive hack
    var width = Math.min($(document.body).width(), 728),
        video = $scope.video;

    var responsiveLink = video.link.replace('{{width}}', width).replace('{{height}}', width / 728 * 500);
    $scope.trustedLink = $sce.trustAsHtml(responsiveLink);

    // iframe css
    $timeout(function () {
        var iframe = $(".video_wrapper .video iframe");
        if (iframe) {
            iframe.addClass('player');
        }
    }, 320);
}