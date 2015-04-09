! function (a) {
    "use strict";
    var b = a.module("ng.cork.ui.stop-propagation", []);
    b.directive("corkUiStopPropagation", ["$timeout", function (b) {
        return {
            restrict: "A",
            scope: {
                disabled: "=corkUiStopPropagation",
                events: "=corkUiPreventEvents"
            },
            link: function (b, c, d) {
                function e(a) {
                    var b, d;
                    for (b in f) - 1 === a.indexOf(b) && c[0].removeEventListener(b, g), delete f.eventName;
                    for (d = 0; d < a.length; d++) b = a[d], f[b] || (f[b] = c[0].addEventListener(b, g))
                }
                var f = {},
                    g = function (a) {
                        b.disabled || a.stopPropagation()
                    };
                b.$watch("events", function () {
                    e(a.isArray(b.events) ? b.events : ["click"])
                }), b.$on("$destroy", function () {
                    e([])
                })
            }
        }
    }])
}(angular);
