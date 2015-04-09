/**
 * ng.cork.ui - v0.0.4 - 2015-04-08
 * https://github.com/cork-labs/ng.cork.ui
 *
 * Copyright (c) 2015 Cork Labs <http://cork-labs.org>
 * License: MIT <http://cork-labs.mit-license.org/2015>
 */
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

(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui.stop-propagation', []);

    /**
     * @ngdoc directive
     * @name ng.cork.ui.stop-propagation.corkUiStopPropagation
     *
     * @description
     * Prevents propagation of certain events through this element.
     *
     * @scope
     * @restrict A
     *
     * @param {boolean=} corkUiStopPropagation Provide an expression. When it evaluates to TRUE, propagation will not be stopped.
     * @param {array=} events Optional, list of event names to prevent Defaults to `['click']`
     */
    module.directive('corkUiStopPropagation', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    disabled: '=corkUiStopPropagation',
                    events: '=corkUiPreventEvents'
                },
                link: function ($scope, $element, $attrs) {

                    /**
                     * @var {object} listeners currently bound
                     */
                    var listeners = {};

                    /**
                     * event handler registered in the browser
                     * @param {object} ev Native event.
                     */
                    var StopPropagation = function (ev) {
                        if (!$scope.disabled) {
                            ev.stopPropagation();
                        }
                    };

                    /**
                     * register event listeners
                     */
                    function updateEventListeners(events) {
                        var eventName;
                        var ix;
                        // remove listeners that are no longer in the event list
                        for (eventName in listeners) {
                            if (events.indexOf(eventName) === -1) {
                                $element[0].removeEventListener(eventName, StopPropagation);
                            }
                            delete listeners.eventName;
                        }
                        // add listeners for events not yet in the listeners map
                        for (ix = 0; ix < events.length; ix++) {
                            eventName = events[ix];
                            if (!listeners[eventName]) {
                                listeners[eventName] = $element[0].addEventListener(eventName, StopPropagation);
                            }
                        }
                    }

                    /**
                     * watch $scope.events for changes, bind/unbind
                     */
                    $scope.$watch('events', function () {
                        if (angular.isArray($scope.events)) {
                            updateEventListeners($scope.events);
                        } else {
                            updateEventListeners(['click']);
                        }
                    });

                    /**
                     * unregister ALL event listeners when scope is destroyed
                     */
                    $scope.$on('$destroy', function () {
                        updateEventListeners([]);
                    });
                }
            };
        }
    ]);

})(angular);

(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui.textarea-auto-resize', []);

    /**
     * @ngdoc directive
     * @name ng.cork.ui.textarea-auto-resize.corkUiTextareaAutoResize
     *
     * @description
     * Resizes textarea via `style.height` after user input.
     *
     * @example
     */
    module.directive('corkUiTextareaAutoResize', [
        '$document',
        function ($document) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {

                    var document = $document[0];
                    var documentElement = document.documentElement;
                    var input = $element[0];
                    var style = input.style;

                    style.overflow = 'hidden';

                    var getHeightOffset = function () {
                        if (style.boxSizing === 'content-box') {
                            return -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
                        } else {
                            return parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
                        }
                    };

                    var resize = function () {
                        var htmlTop = documentElement.scrollTop;
                        var bodyTop = document.body.scrollTop;
                        var heightOffset = getHeightOffset();
                        style.height = '1px';
                        var targetHeight = input.scrollHeight + (isNaN(heightOffset) ? 0 : heightOffset);
                        style.height = (targetHeight + 10) + 'px';
                        documentElement.scrollTop = htmlTop;
                        document.body.scrollTop = bodyTop;
                    };

                    input.addEventListener('keyup', resize, true);
                    resize();

                    $scope.$on('$destroy', function () {
                        input.removeEventListener('keyup', resize, true);
                    });

                    if (ngModelController) {
                        $scope.$watch(function () {
                            return ngModelController.$viewValue;
                        }, resize);
                    }
                }
            };
        }
    ]);

})(angular);

(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui', [
        'ng.cork.ui.enter-click',
        'ng.cork.ui.focus-on',
        'ng.cork.ui.stop-propagation'
    ]);

})(angular);
