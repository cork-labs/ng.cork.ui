! function (a) {
    "use strict";
    var b = a.module("ng.cork.ui.focus-on", []);
    b.directive("corkUiFocusOn", ["$timeout", function (a) {
        return function (b, c, d) {
            function e() {
                a(function () {
                    c[0].focus()
                })
            }
            var f = d.corkUiFocusOn;
            d.tabindex || c.attr("tabindex", 0), "auto" === f ? e() : b.$on(f, e)
        }
    }])
}(angular);