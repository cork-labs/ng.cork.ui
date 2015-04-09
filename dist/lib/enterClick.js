(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui.enter-click', []);

    /**
     * @ngdoc directive
     * @name ng.cork.ui.enter-click.corkUiEnterClick
     *
     * @description
     * When element is focused, converts "Enter" keypress events into click events.
     *
     * If element is not focusable, i.e., does not have a `tabindex` attribute, then `tabindex` is forced to `0`.
     *
     * @restrict A
     */
    module.directive('corkUiEnterClick', [
        '$document',
        function ($document) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {
                    if (!$attrs.tabindex) {
                        $element.attr('tabindex', 0);
                    }
                    $element.on('keypress', function (ev) {
                        if (ev.keyCode === 13) {
                            $element.triggerHandler('click');
                        }
                    });
                }
            };
        }
    ]);

})(angular);
