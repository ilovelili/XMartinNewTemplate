(function (angular) {
    'use strict';
    angular.module('eroMartin.keywordListDirective', []).directive('keywordList', KeywordListDirectiveFunc);

    KeywordListDirectiveFunc.$inject = ['$timeout', 'MongoService', 'DateService', 'UseragentService'];

    function KeywordListDirectiveFunc($timeout, MongoService, DateService, UseragentService) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: 'partial/_keywordlist.html',
            scope: true,
            link: function (scope) {
                var searchCriteria = [];
                scope.catlimit = 200;
                scope.videos = [];
                scope.checked = false;
                scope.searchClicked = false;
                scope.setupSearchCriteria = function ($event, cat) {
                    scope.checked = $event.target.checked;

                    var index = searchCriteria.indexOf(cat);
                    if (index > -1) {
                        searchCriteria.splice(index, 1)
                    } else {
                        // todo: set overload when necessary e.g. if searchCriteria.length > 5 return;
                        searchCriteria.push(cat);
                    }
                };
                scope.search = function () {
                    scope.videos = [];
                    if (!searchCriteria.length) return;

                    // there is searchCriteria, in other words, there is data
                    scope.searchClicked = true;
                    angular.forEach(searchCriteria, function (cat, index) {
                        MongoService.getByCat(cat).then(function (videos) {
                            videos.map(function (video) {
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
                            // remove duplicate by _id (consider use filter) and need check performance issue
                            var result = [];
                            angular.forEach(scope.videos, function (video) {
                                var ids = result.map(function (item) {
                                    return item._id;
                                });

                                if (ids.indexOf(video._id) === -1) {
                                    result.push(video);
                                }
                            });

                            scope.videos = result;
                        });
                    });

                    searchCriteria = [];
                    // UI
                    var keywordsLabel = $(".form-group .checkbox label");
                    if (keywordsLabel) {
                        keywordsLabel.removeClass('btn-info');
                        keywordsLabel.addClass('btn-default');
                    }

                    $timeout(function () {
                        // scroll                  
                        $('html,body').animate({
                            scrollTop: $(".searchresultposition").offset().top,
                        }, 'slow');
                    }, 100);
                };

                $timeout(function () {
                    // hack btn toggle
                    var keywordsLabel = $('.form-group .checkbox label');
                    if (keywordsLabel) {
                        keywordsLabel.delegate('input[type="checkbox"]', 'click', function () {
                            // キーワードリストのボタンオンオフ
                            $(this).parent().toggleClass('btn-info');
                            $(this).parent().toggleClass('btn-default');
                        });
                    }
                }, 320);
            },
        };
    }
})(window.angular);
