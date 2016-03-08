(function(angular) {
    'use strict';

    Number.prototype.padLeft = function(base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };

    angular.module('eroMartin.dateService', [])
        .factory('dateService', function() {
            return {
                formatDate: function(date) {
                    date = new Date(date);
                    return [
                        date.getFullYear(),
                        (date.getMonth() + 1).padLeft(),
                        date.getDate().padLeft()                        
                    ].join('-') + ' ' + [
                        date.getHours().padLeft(),
                        date.getMinutes().padLeft(),
                        date.getSeconds().padLeft()
                    ].join(':');
                }
            };
        });
})(window.angular);
