(function (angular) {
    'use strict';

    angular.module('eroMartin.advertisementHackService', [])
        .factory('AdvertisementHackService', function () {
            return {
                hack992Iframe: function (iframe) {
                    var marginLeft = iframe.width() * ((1 - 0.8) / 2 * -1);
                    iframe.css({
                        'transform': 'scaleX(0.8)',
                        'marginLeft': marginLeft + 'px',
                    });
                },
                hackNativeIframe: function (iframe, scale) {
                    var marginLeft = iframe.width() * ((1 - scale) / 2 * -1),
                        marginTop = iframe.height() * ((1 - scale) / 2 * -1);

                    iframe.css({
                        'transform': 'scale(' + scale + ')',
                        'marginLeft': marginLeft + 'px',
                        'marginTop': marginTop + 'px',
                    });
                },
            };
        });
})(window.angular);
