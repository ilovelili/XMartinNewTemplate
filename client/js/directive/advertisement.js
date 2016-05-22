(function (angular) {
    'use strict';
    angular.module('eroMartin.advertisementDirective', [])
        .directive('maist200x200', AdSpot200x200Func)
        .directive('maist728x90', AdSpot728x90Func)
        .directive('maist728x90Hack992', AdSpot728x90HackFunc)
        .directive('maist200x200Hack992', AdSpot200x200HackFunc);

    AdSpot200x200Func.$inject = ['AdvertisementHackService', '$timeout'];
    function AdSpot200x200Func(AdvertisementHackService, $timeout) {
        return {
            restrict: 'E',
            template: "<iframe width='200' height='200' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_200x200.html'></iframe>",
            link: function (scope, element, attributes) {
                if (element.parent().css('display') != 'none')
                    $timeout(function () { AdvertisementHackService.hackNativeIframe($(element.find('iframe')[0]), 198.5 / 200) }, 100);
            },
        };
    }

    function AdSpot728x90Func(AdvertisementHackService) {
        return {
            restrict: 'E',
            template: "<iframe width='728' height='90' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_728x90.html'></iframe>",
        };
    }

    AdSpot728x90HackFunc.$inject = ['AdvertisementHackService', '$timeout'];
    function AdSpot728x90HackFunc(AdvertisementHackService, $timeout) {
        return {
            restrict: 'E',
            template: "<iframe width='728' height='90' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_728x90.html'></iframe>",
            link: function (scope, element, attributes) {
                if (element.parent().css('display') != 'none')
                    $timeout(function () { AdvertisementHackService.hack992Iframe($(element.find('iframe')[0])) }, 100);
            },
        };
    }

    AdSpot200x200HackFunc.$inject = ['AdvertisementHackService', '$timeout'];
    function AdSpot200x200HackFunc(AdvertisementHackService, $timeout) {
        return {
            restrict: 'E',
            template: "<iframe width='200' height='200' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_200x200.html'></iframe>",
            link: function (scope, element, attributes) {
                if (element.parent().css('display') != 'none')
                    $timeout(function () { AdvertisementHackService.hackNativeIframe($(element.find('iframe')[0]), 148.5 / 200) }, 100);
            },
        };
    }
})(window.angular);
