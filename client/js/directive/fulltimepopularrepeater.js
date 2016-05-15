(function (angular) {
    'use strict';
    angular.module('eroMartin.fulltimePopularVideoRepeaterDirective', []).directive('fulltimePopularVideoRepeater', FulltimePopularVideoRepeaterDirectiveFunc);

    FulltimePopularVideoRepeaterDirectiveFunc.$inject = ['MongoService'];

    function FulltimePopularVideoRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_fulltimepopularrepeater.html',
            link: function (scope, elements, attributes) {
                scope.query = MongoService.getFulltimePopularById();
            },
        };
    }
})(window.angular);
