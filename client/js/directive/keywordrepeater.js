(function (angular) {
    'use strict';
    angular.module('eroMartin.keywordRepeaterDirective', []).directive('keywordRepeater', KeywordRepeaterDirectiveFunc);

    KeywordRepeaterDirectiveFunc.$inject = ['MongoService', '$routeParams', 'DateService'];

    function KeywordRepeaterDirectiveFunc(MongoService, $routeParams, DateService) {
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