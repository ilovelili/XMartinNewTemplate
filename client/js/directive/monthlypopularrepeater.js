(function (angular) {
    'use strict';
    angular.module('eroMartin.monthlyPopularVideoRepeaterDirective', []).directive('monthlyPopularVideoRepeater', MonthlyPopularVideoRepeaterDirectiveFunc);

    MonthlyPopularVideoRepeaterDirectiveFunc.$inject = ['MongoService'];

    function MonthlyPopularVideoRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_monthlypopularrepeater.html',
            link: function (scope, elements, attributes) {
                scope.query = MongoService.getMonthlyPopularById();
            },
        };
    }
})(window.angular);
