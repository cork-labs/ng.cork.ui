! function (a) {
    "use strict";
    var b, c, d, e, f = a.module("ng.cork.ui.keys", ["ng.cork.deep.extend"]),
        g = "deletion",
        h = "navigation",
        i = "movement",
        j = "pagination",
        k = "direction",
        l = [{
            c: 8,
            n: "Backspace",
            t: [g, h]
        }, {
            c: 9,
            n: "Tab",
            t: [h]
        }, {
            c: 13,
            n: "Enter",
            t: [h]
        }, {
            c: 27,
            n: "Esc",
            t: [h]
        }, {
            c: 33,
            n: "PageUp",
            t: [i, j]
        }, {
            c: 34,
            n: "PageDown",
            t: [i, j]
        }, {
            c: 35,
            n: "End",
            t: [i, j]
        }, {
            c: 36,
            n: "Home",
            t: [i, j]
        }, {
            c: 37,
            n: "Left",
            t: [i, k]
        }, {
            c: 38,
            n: "Up",
            t: [i, k]
        }, {
            c: 39,
            n: "Right",
            t: [i, k]
        }, {
            c: 40,
            n: "Down",
            t: [i, k]
        }, {
            c: 45,
            n: "Insert",
            t: []
        }, {
            c: 46,
            n: "Delete",
            t: [g]
        }],
        m = {
            ie: {
                map: {},
                filter: function (a) {
                    return a
                }
            },
            opera: {
                map: {
                    5: 10
                }
            }
        },
        n = {},
        o = {};
    for (c = 0; c < l.length; c++)
        if (b = l[c], n[b.n] = b.c, b.t)
            for (d = 0; d < b.t.length; d++) e = b.t[d], o[e] || (o[e] = []), o[e].push(b.c);
    f.constant("corkUiKeysCodes", n), f.provider("corkUiKeys", ["corkDeepExtend", "corkUiKeysCodes", function (a, b) {
        var c = this,
            d = {
                tags: o
            };
        c.configure = function (b) {
            a(d, b)
        }, c.$get = [function () {
            function a(a) {
                "function" == typeof c.filter && (a = c.filter(a)), c.amp[a]
            }
            var b, c = m[b],
                d = {
                    key: n,
                    getCode: function (b) {
                        var d = b.charCode ? b.charCode : b.keyCode;
                        return c && (d = a(d)), d
                    },
                    is: function (a, b) {
                        return !!o[a] && -1 !== o[a].indexOf(b)
                    }
                };
            return d
        }]
    }])
}(angular);