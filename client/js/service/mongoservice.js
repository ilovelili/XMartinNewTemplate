(function(angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function($resource) {
                return {
                    getById: function() {
                        return $resource('http://188.166.244.244:3000/videos/:id', {});
                    },
                    getByCat: function() {
                        return $resource('http://188.166.244.244:3000/videos/cat/:cat', {});
                    }
                };
            }
        ]);
})(window.angular);
