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
                hackNativeIframe: function (iframe) {
                    var thumbnail = $('.mov_thumb'),
                        scaleX = parseInt(thumbnail.css('width')) / 300, 
                        scaleY = parseInt(thumbnail.css('height')) / 250;
                    
                    var marginLeft = iframe.width() * ((1 - scaleX) / 2 * -1),
                        marginTop = iframe.height() * ((1 - scaleY) / 2 * -1),
                        more_btn = iframe.parent().next(); // sorry to be ugly

                    iframe.css({
                        'transform': 'scale(' + scaleX + ',' + scaleY + ')',
                        'marginLeft': marginLeft + 'px',
                        'marginTop': marginTop + 'px',
                    });
                    
                    more_btn.css({
                        'marginTop': marginTop + 'px',
                    });
                },
            };
        });
})(window.angular);
