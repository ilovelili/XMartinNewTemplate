(function(angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function($resource) {
                return {
                    getById: function(id) {
                        if (id) {
                            return $resource('http://188.166.244.244:3000/videos/:id', { id: id }).get().$promise;
                        }

                        return $resource('http://188.166.244.244:3000/videos/:id', {}).query().$promise;
                    },
                    getByCat: function(cat) {
                        if (cat) {
                            return $resource('http://188.166.244.244:3000/videos/cat/:cat', { cat: cat }).query().$promise;
                        }

                        return $resource('http://188.166.244.244:3000/videos/cat/:cat', {}).query().$promise;
                    }
                };
            }
        ]);
})(window.angular);
