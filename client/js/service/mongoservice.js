(function (angular) {
    'use strict';
    angular.module('eroMartin.mongoService', ['ngResource'])
        .factory('MongoService', ['$resource',
            function ($resource) {
                var server = 'http://178.128.111.159:3000';
                return {
                    getById: function (id) {
                        try{
                            if (id) {
                                return $resource(server + '/videos/:id', { id: id }).get().$promise;
                            }
                            return $resource(server + '/videos/:id', {}).query().$promise;    
                        } catch (ex) {
                            console.error(ex);
                        }                        
                    },
                    getByCat: function (cat) {
                        try{
                            if (cat) {
                                return $resource(server + '/videos/cat/:cat', { cat: cat }).query().$promise;
                            }

                            return $resource(server + '/videos/cat/:cat', {}).query().$promise;
                        } catch(ex) {
                            console.error(ex);
                        }                        
                    },
                    aggregateCat: function () {
                        try{
                            return $resource(server + '/aggregateCat/', {}).query().$promise;
                        } catch (ex) {
                            console.error(ex);
                        }                        
                    },
                    getWeeklyPopularById: function (id) {
                        try {
                            if (id) {
                                return $resource(server + '/weeklypopularvideos/:id', { id: id }).get().$promise;
                            }
                            return $resource(server + '/weeklypopularvideos/:id', {}).query().$promise;
                        } catch (ex) {
                            console.error(ex);
                        }                        
                    },
                    getMonthlyPopularById: function (id) {
                        try { 
                            if (id) {
                                return $resource(server + '/monthlypopularvideos/:id', { id: id }).get().$promise;
                            }
                            return $resource(server + '/monthlypopularvideos/:id', {}).query().$promise;
                        } catch (ex) {
                            console.error(ex);   
                        }                        
                    },
                    getFulltimePopularById: function (id) {
                        try {
                            if (id) {
                                return $resource(server + '/fulltimepopularvideos/:id', { id: id }).get().$promise;
                            }
                            return $resource(server + '/fulltimepopularvideos/:id', {}).query().$promise;
                        } catch (ex) {
                            console.error(ex);
                        }                        
                    },
                };
            }
        ]);
})(window.angular);
