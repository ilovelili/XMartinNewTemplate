(function (angular) {
    'use strict';
    angular.module('eroMartin.keywordRepeaterDirective', []).directive('keywordRepeater', KeywordRepeaterDirectiveFunc);

    KeywordRepeaterDirectiveFunc.$inject = ['MongoService', '$rootScope', '$routeParams', 'DateService'];

    function KeywordRepeaterDirectiveFunc(MongoService, $rootScope, $routeParams, DateService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordrepeater.html',
            link: function (scope, elements, attributes) {
                scope.category = $routeParams.cat;                
                scope.query = MongoService.getByCat(scope.category);
            },
        };
    }
})(window.angular);