(function(angular) {
    'use strict';
    angular.module('eroMartin.keywordListDirective', []).directive('keywordList', KeywordListDirectiveFunc);

    KeywordListDirectiveFunc.$inject = ['MongoService'];

    function KeywordListDirectiveFunc(MongoService) {
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordlist.html',
            link: function(scope, elements, attributes) {                
                MongoService.aggregateCat().then(function(cats) {
                    cats.map(function(cat) {
                        angular.extend(cat, {
                            name: cat["_id"][0],
                        });                        
                    });

                    scope.aggregateCats = cats;
                });
            }
        };
    }
})(window.angular);