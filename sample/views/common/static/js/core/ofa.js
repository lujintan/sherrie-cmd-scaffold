/**
 * @author gaojiexuan@baidu.com
 *
 * 每位工程师都有保持代码优雅的义务
 */

(function () {
    var isArray = Array.isArray || function(object){ return object instanceof Array },
        class2type = {},
        typeArr = "Boolean Number String Function Array Date RegExp Object Error".split(" ");

    for (var i = 0; i < typeArr.length; i++) {
        var name = typeArr[i];
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    }
    function type(obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    }
    function isWindow(obj) {
        return obj != null && obj == obj.window;
    }
    function isObject(obj) {
        return type(obj) == "object";
    }
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    function matchSelector(element, selector) {
        if (!element || element.nodeType !== 1) {
            return false;
        }

        var parent,
            match,
            matchesSelector = element.webkitMatchesSelector || element.matchesSelector;

        if (matchesSelector) {
            match = matchesSelector.call(element, selector)
        } else {
            parent = element.parentNode;
            match = !! parent.querySelector(selector);
        }

        return match;
    }
    function extend(target, source, deep) {
        for (key in source) {
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                    target[key] = {}
                }

                if (isArray(source[key]) && !isArray(target[key])){
                    target[key] = []
                }

                extend(target[key], source[key], deep)
            } else if (source[key] !== undefined) {
                target[key] = source[key]
            }
        }
        return target;
    }



    var Ofa = {
        Component: function (opt) {
            var el = document.querySelectorAll(opt.ele)[0],
                init = opt.init || function () {

                },
                events = opt.events || {},
                Constructor = function (el) {
                    if (el) {
                        this.el = el;
                    }

                    var curEl = this.el,
                        events = this.events;

                    this.init();

                    for (var key in events) {
                        var func = events[key],
                            arr = key.split(' '),
                            selector = arr[0],
                            eventType = arr[1];

                        (function () {
                            curEl.addEventListener(eventType, function (e) {
                                var element = e.target,
                                    parent = element;

                                while (parent !== document.body) {
                                    if (matchSelector(parent, selector)) {
                                        // 验证url, 可以自行配置url验证规则
                                        e.stopPropagation();
                                        e.preventDefault();
                                        func();
                                        return;
                                    } else {
                                        parent = parent.parentNode;
                                    }
                                }
                            }, false);
                        })();
                    }
                };

            opt = extend(opt, {
                el: el,
                init: init,
                events: events
            }, true);

            Constructor.prototype = extend(Constructor.prototype, opt, true);
            return Constructor;
        }
    };

    window.Ofa = Ofa;
})();