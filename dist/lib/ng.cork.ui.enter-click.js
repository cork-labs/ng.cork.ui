! function (a) {
    "use strict";
    var b = a.module("ng.cork.ui.enter-click", []);
    b.directive("corkUiEnterClick", ["$document", function (a) {
        return {
            restrict: "A",
            link: function (a, b, c) {
                c.tabindex || b.attr("tabindex", 0), b.on("keypress", function (a) {
                    13 === a.keyCode && b.triggerHandler("click")
                })
            }
        }
    }])
}(angular);