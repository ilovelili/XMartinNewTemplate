(function(angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function($resource) {
                var server = 'http://188.166.244.244:3000';
                return {
                    getById: function(id) {
                        if (id) {
                            return $resource(server + '/videos/:id', { id: id }).get().$promise;
                        }

                        return $resource(server + '/videos/:id', {}).query().$promise;
                    },
                    getByCat: function(cat) {
                        if (cat) {
                            return $resource(server + '/videos/cat/:cat', { cat: cat }).query().$promise;
                        }

                        return $resource(server + '/videos/cat/:cat', {}).query().$promise;
                    },
                    aggregateCat: function() {
                        return $resource(server + '/aggregateCat/', {}).query().$promise;
                    },
                };
            }
        ]);
})(window.angular);
