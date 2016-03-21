(function(angular) {
    'use strict';
    angular.module('eroMartin.keywordListDirective', []).directive('keywordList', KeywordListDirectiveFunc);    

    function KeywordListDirectiveFunc() {
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordlist.html',
            scope: true,
            link: function(scope) {
            	scope.limit = 100;
            },
        };
    }
})(window.angular);