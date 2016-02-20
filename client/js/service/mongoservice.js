(function(angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function($resource) {
                return {
                    getById: function() {
                        return $resource('http://127.0.0.1:3000/videos/:id', {});
                    },
                    getByCat: function() {
                        return $resource('http://127.0.0.1:3000/videos/cat/:cat', {});
                    }
                };
            }
        ]);
})(window.angular);