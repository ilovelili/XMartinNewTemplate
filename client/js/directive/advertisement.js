(function (angular) {
    'use strict';
    angular.module('eroMartin.advertisementDirective', [])
        .directive('maist728x90', AdSpot728x90Func)
        .directive('maist728x90Hack', AdSpot728x90HackFunc)
        .directive('maist300x250', AdSpot300x250Func)
        .directive('maist300x250Hack', AdSpot300x250HackFunc)

    function AdSpot728x90Func() {
        return {
            restrict: 'E',
            replace: true,
            template: "<iframe width='728' height='90' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_728x90.html'></iframe>",
        };
    }

    function AdSpot300x250Func() {
        return {
            restrict: 'E',
            replace: true,
            // template: "<iframe width='300' height='250' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_nend_300x250.html'></iframe>",
            template: "<iframe src='//adspaces.ero-advertising.com/banads/view.php?spaceid=2147091' frameborder='0' width='300' height='250' scrolling='no'></iframe>",
        };
    }

    AdSpot728x90HackFunc.$inject = ['AdvertisementHackService', '$timeout', '$interval'];
    function AdSpot728x90HackFunc(AdvertisementHackService, $timeout, $interval) {
        return {
            restrict: 'E',
            replace: true,
            template: "<iframe width='728' height='90' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_728x90.html'></iframe>",
            link: function (scope, element, attributes) {
                var seed = $interval(function () {
                    var mov_thumb = $('.mov_thumb');
                    if (mov_thumb.length && mov_thumb.css('display') != 'none') {
                        AdvertisementHackService.hack992Iframe(element)
                        $interval.cancel(seed);
                    }
                }, 100);
            },
        };
    }

    AdSpot300x250HackFunc.$inject = ['AdvertisementHackService', '$interval'];
    function AdSpot300x250HackFunc(AdvertisementHackService, $interval) {
        return {
            restrict: 'E',
            replace: true,
            template: "<iframe src='//adspaces.ero-advertising.com/banads/view.php?spaceid=2147091' frameborder='0' width='300' height='250' scrolling='no'></iframe>",
            // template: "<iframe width='300' height='250' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_nend_300x250.html'></iframe>",
            link: function (scope, element, attributes) {
                var seed = $interval(function () {
                    var mov_thumb = $('.mov_thumb');
                    if (mov_thumb.length && mov_thumb.css('display') != 'none') {
                        AdvertisementHackService.hackNativeIframe(element);
                        $interval.cancel(seed);
                    }
                }, 100);
            },
        };
    }
})(window.angular);
