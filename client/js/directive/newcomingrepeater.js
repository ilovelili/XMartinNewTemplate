(function (angular) {
    'use strict';
    angular.module('eroMartin.newcomingRepeaterDirective', []).directive('newcomingRepeater', NewcomingRepeaterDirectiveFunc);

    NewcomingRepeaterDirectiveFunc.$inject = ['MongoService'];

    function NewcomingRepeaterDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_newcomingrepeater.html',
            scope: true,
            link: function (scope, elements, attributes) {
                scope.query = MongoService.getById();
            },
        };
    }
})(window.angular);
