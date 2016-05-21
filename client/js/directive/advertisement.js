(function (angular) {
    'use strict';
    angular.module('eroMartin.advertisementDirective', [])
        .directive('maist200x200', Maist200x200Func)
        .directive('maist728x90', Maist728x90Func);        

    function Maist200x200Func() {
        return {
            restrict: 'E',
            template: "<iframe width='200' height='200' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_200x200.html'></iframe>",            
        };
    }
    
    function Maist728x90Func() {
        return {
            restrict: 'E',
            template: "<iframe width='728' height='90' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' bordercolor='#000000' src='partial/advertisement/_maist_728x90.html'></iframe>",            
        };
    }
})(window.angular);
