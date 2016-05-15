(function (angular) {
    'use strict';
    angular.module('eroMartin.weeklyPopularVideoRepeaterDirective', []).directive('weeklyPopularVideoRepeater', WeeklyPopularVideoRepeaterDirectiveFunc);

    WeeklyPopularVideoRepeaterDirectiveFunc.$inject = ['MongoService'];

    function WeeklyPopularVideoRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_weeklypopularrepeater.html',
            link: function (scope, elements, attributes) {
                scope.query = MongoService.getWeeklyPopularById();
            },
        };
    }
})(window.angular);


(function (angular) {
    'use strict';
    angular.module('eroMartin.weeklyPopularVideoRepeaterHomepageDirective', []).directive('weeklyPopularVideoHomepageRepeater', WeeklyPopularVideoHomepageRepeaterDirectiveFunc);

    WeeklyPopularVideoHomepageRepeaterDirectiveFunc.$inject = ['MongoService'];

    function WeeklyPopularVideoHomepageRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_weeklypopularhomepagerepeater.html',
            scope: true,
            link: function (scope, elements, attributes) {
                scope.query = MongoService.getWeeklyPopularById();
            },
        };
    }
})(window.angular);
