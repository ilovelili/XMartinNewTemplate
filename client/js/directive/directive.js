(function(angular) {
    'use strict';
    angular.module('eroMartin.directives', [
        'eroMartin.naviDirective',
        'eroMartin.sidemenuDirective',
        'eroMartin.footerDirective',        
        //'eroMartin.contentRepeaterDirective',
        'eroMartin.newcomingRepeaterDirective',
        'eroMartin.googleanalyticsDirective',
        'eroMartin.adspotDirective',
        'eroMartin.nativeAdSpotDirective',
        'eroMartin.keywordRepeaterDirective',
        'eroMartin.keywordListDirective',
        'eroMartin.weeklyPopularVideoRepeaterDirective',
        'eroMartin.monthlyPopularVideoRepeaterDirective',
        'eroMartin.fulltimePopularVideoRepeaterDirective',
    ]);
})(window.angular);
