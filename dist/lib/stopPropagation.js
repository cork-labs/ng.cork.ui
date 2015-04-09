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
