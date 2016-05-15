(function (angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function ($resource) {
                var server = 'http://188.166.244.244:3000';
                return {
                    getById: function (id) {
                        if (id) {
                            return $resource(server + '/videos/:id', { id: id }).get().$promise;
                        }

                        return $resource(server + '/videos/:id', {}).query().$promise;
                    },
                    getByCat: function (cat) {
                        if (cat) {
                            return $resource(server + '/videos/cat/:cat', { cat: cat }).query().$promise;
                        }

                        return $resource(server + '/videos/cat/:cat', {}).query().$promise;
                    },
                    aggregateCat: function () {
                        return $resource(server + '/aggregateCat/', {}).query().$promise;
                    },
                    getWeeklyPopularById: function (id) {
                        if (id) {
                            return $resource(server + '/weeklypopularvideos/:id', { id: id }).get().$promise;
                        }

                        return $resource(server + '/weeklypopularvideos/:id', {}).query().$promise;
                    },
                    getMonthlyPopularById: function (id) {
                        if (id) {
                            return $resource(server + '/monthlypopularvideos/:id', { id: id }).get().$promise;
                        }

                        return $resource(server + '/monthlypopularvideos/:id', {}).query().$promise;
                    },
                    getFulltimePopularById: function (id) {
                        if (id) {
                            return $resource(server + '/fulltimepopularvideos/:id', { id: id }).get().$promise;
                        }

                        return $resource(server + '/fulltimepopularvideos/:id', {}).query().$promise;
                    },
                };
            }
        ]);
})(window.angular);
