(function(angular) {
    'use strict';
    angular.module('eroMartin.keywordListDirective', []).directive('keywordList', KeywordListDirectiveFunc);

    KeywordListDirectiveFunc.$inject = ['MongoService', 'DateService'];

    function KeywordListDirectiveFunc(MongoService, DateService) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordlist.html',
            scope: true,
            link: function(scope) {
                var searchCriteria = [];
                scope.limit = 100;
                scope.videos = [];
                scope.searchClicked = false;
                scope.setupSearchCriteria = function(cat) {
                    var index = searchCriteria.indexOf(cat);
                    if (index > -1) {
                        searchCriteria.splice(index, 1)
                    } else {
                        // db overload => can't set more that 5 cats
                        if (searchCriteria.length > 5) return;
                        searchCriteria.push(cat);
                    }
                };
                scope.search = function() {
                    scope.videos = [];
                    angular.forEach(searchCriteria, function(cat, index) {
                        MongoService.getByCat(cat).then(function(videos) {
                            videos.map(function(video) {
                                angular.extend(video, {
                                    date: DateService.formatDate(video.date)
                                });

                                // stupid hack
                                if (video.title.length > 24)
                                    angular.extend(video, {
                                        title: video.title.substring(0, 24) + '...'
                                    });
                            });
                            
                            scope.videos = scope.videos.concat(videos);
                        });
                    });

                    scope.searchClicked = true;
                };
            },
        };
    }
})(window.angular);
