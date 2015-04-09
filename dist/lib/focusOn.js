(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui.focus-on', []);

    /**
     * @ngdoc directive
     * @name ng.cork.ui.focus-on.corkUiFocusOn
     *
     * @description
     * Focus element when a certain message is received or immediately after rendering.
     *
     * @restrict A
     *
     * @param {string} corkUiFocusOn Via attribute, not watched. Set to "focus" to focus automaticaaly on render, set to a string to listen for that message name.
     */
    module.directive('corkUiFocusOn', [
        '$timeout',
        function ($timeout) {
            return function ($scope, $element, $attrs) {
                var corkUiFocusOn = $attrs.corkUiFocusOn;
                if (!$attrs.tabindex) {
                    $element.attr('tabindex', 0);
                }

                function setFocus() {
                    $timeout(function () {
                        $element[0].focus();
                    });
                }
                if (corkUiFocusOn === 'auto') {
                    setFocus();
                } else {
                    $scope.$on(corkUiFocusOn, setFocus);
                }
            };
        }
    ]);

})(angular);
