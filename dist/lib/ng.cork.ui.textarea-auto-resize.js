! function (a) {
    "use strict";
    var b = a.module("ng.cork.ui.textarea-auto-resize", []);
    b.directive("corkUiTextareaAutoResize", ["$document", function (a) {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (b, c, d, e) {
                var f = a[0],
                    g = f.documentElement,
                    h = c[0],
                    i = h.style;
                i.overflow = "hidden";
                var j = function () {
                        return "content-box" === i.boxSizing ? -(parseFloat(i.paddingTop) + parseFloat(i.paddingBottom)) : parseFloat(i.borderTopWidth) + parseFloat(i.borderBottomWidth)
                    },
                    k = function () {
                        var a = g.scrollTop,
                            b = f.body.scrollTop,
                            c = j();
                        i.height = "1px";
                        var d = h.scrollHeight + (isNaN(c) ? 0 : c);
                        i.height = d + 10 + "px", g.scrollTop = a, f.body.scrollTop = b
                    };
                e && b.$watch(function () {
                    return h.value
                }, function () {
                    k()
                }), h.addEventListener("keyup", function () {
                    k()
                }), k(), b.$on("$destroy", function () {
                    h.removeEventListener("keyup", k)
                })
            }
        }
    }])
}(angular);