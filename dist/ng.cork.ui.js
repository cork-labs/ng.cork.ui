/**
 * ng.cork.ui - v0.0.10 - 2015-05-11
 * https://github.com/cork-labs/ng.cork.ui
 *
 * Copyright (c) 2015 Cork Labs <http://cork-labs.org>
 * License: MIT <http://cork-labs.mit-license.org/2015>
 */
(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.ui', [
        'ng.cork.ui.keys',
        'ng.cork.ui.enter-click',
        'ng.cork.ui.focus-on',
        'ng.cork.ui.stop-propagation',
        'ng.cork.ui.textarea-auto-resize'
    ]);

})(angular);

!function(a){"use strict";var b=a.module("ng.cork.ui.enter-click",[]);b.directive("corkUiEnterClick",["$document",function(a){return{restrict:"A",link:function(a,b,c){c.tabindex||b.attr("tabindex",0),b.on("keypress",function(a){13===a.keyCode&&b.triggerHandler("click")})}}}])}(angular);
!function(a){"use strict";var b=a.module("ng.cork.ui.focus-on",[]);b.directive("corkUiFocusOn",["$timeout",function(a){return function(b,c,d){function e(){a(function(){c[0].focus()})}var f;d.tabindex||c.attr("tabindex",0),d.$observe("corkUiFocusOn",function(a){f&&f(),"auto"===a?e():f=b.$on(a,e)})}}])}(angular);
!function(a){"use strict";var b,c,d,e,f=a.module("ng.cork.ui.keys",["ng.cork.deep.extend"]),g="deletion",h="navigation",i="movement",j="pagination",k="direction",l=[{c:8,n:"Backspace",t:[g,h]},{c:9,n:"Tab",t:[h]},{c:13,n:"Enter",t:[h]},{c:27,n:"Esc",t:[h]},{c:33,n:"PageUp",t:[i,j]},{c:34,n:"PageDown",t:[i,j]},{c:35,n:"End",t:[i,j]},{c:36,n:"Home",t:[i,j]},{c:37,n:"Left",t:[i,k]},{c:38,n:"Up",t:[i,k]},{c:39,n:"Right",t:[i,k]},{c:40,n:"Down",t:[i,k]},{c:45,n:"Insert",t:[]},{c:46,n:"Delete",t:[g]}],m={ie:{translate:function(a){return a},map:{}},opera:{map:{5:10}}},n={},o={};for(c=0;c<l.length;c++)if(b=l[c],n[b.n]=b.c,b.t)for(d=0;d<b.t.length;d++)e=b.t[d],o[e]||(o[e]=[]),o[e].push(b.c);f.constant("corkUiKeysCodes",n),f.provider("corkUiKeys",["corkDeepExtend","corkUiKeysCodes",function(a,b){var c=this,d={tags:o};c.configure=function(b){a(d,b)},c.$get=[function(){function a(a){return"function"==typeof c.translate&&(a=c.translate(a)),c.map[a]&&(a=c.map[a](a)),a}var b,c=m[b],d={key:n,getCode:function(b){var d=b.charCode?b.charCode:b.keyCode;return c&&(d=a(d)),d},is:function(a,b){return!!o[a]&&-1!==o[a].indexOf(b)}};return d}]}])}(angular);
!function(a){"use strict";var b=a.module("ng.cork.ui.stop-propagation",[]);b.directive("corkUiStopPropagation",["$timeout",function(b){return{restrict:"A",scope:{disabled:"=corkDisabled",events:"=corkEvents"},link:function(b,c,d){function e(a){var b,d;for(b in f)-1===a.indexOf(b)&&c[0].removeEventListener(b,g),delete f.eventName;for(d=0;d<a.length;d++)b=a[d],f[b]||(f[b]=c[0].addEventListener(b,g))}var f={},g=function(a){b.disabled||a.stopPropagation()};b.$watch("events",function(){e(a.isArray(b.events)?b.events:["click"])}),b.$on("$destroy",function(){e([])})}}}])}(angular);
!function(a){"use strict";var b=a.module("ng.cork.ui.textarea-auto-resize",[]);b.directive("corkUiTextareaAutoResize",["$document",function(a){return{restrict:"A",require:"?ngModel",link:function(b,c,d,e){var f=a[0],g=f.documentElement,h=c[0],i=h.style;i.overflow="hidden";var j=function(){return"content-box"===i.boxSizing?-(parseFloat(i.paddingTop)+parseFloat(i.paddingBottom)):parseFloat(i.borderTopWidth)+parseFloat(i.borderBottomWidth)},k=function(){var a=g.scrollTop,b=f.body.scrollTop,c=j();i.height="1px";var d=h.scrollHeight+(isNaN(c)?0:c);i.height=d+10+"px",g.scrollTop=a,f.body.scrollTop=b};e&&b.$watch(function(){return h.value},function(){k()}),h.addEventListener("keyup",function(){k()}),k(),b.$on("$destroy",function(){h.removeEventListener("keyup",k)})}}}])}(angular);