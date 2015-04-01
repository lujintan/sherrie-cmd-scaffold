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



    var Rosetta = {
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
        },


    };

    window.Rosetta = extend(Rosetta, window.Rosetta || {}, true);
})();
/**
 * file: mod.js
 * ver: 1.0.2
 * auth: zhangjiachen@baidu.com
 * update: 16:30 2013/6/21
 */
var require, define;

(function(self) {
    var head = document.getElementsByTagName('head')[0],
        loadingMap = {},
        factoryMap = {},
        modulesMap = {},
        scriptsMap = {},
        resMap, pkgMap;


    function loadScript(id, callback) {
        var res = resMap[id] || {};
        var url = res.pkg
                    ? pkgMap[res.pkg].url
                    : (res.url || id);

        if (url in scriptsMap) {
            return;
        }
        scriptsMap[url] = true;

        var queue = loadingMap[id] || (loadingMap[id] = []);
        queue.push(callback);

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
    }

    define = function(id, factory) {
        factoryMap[id] = factory;

        var queue = loadingMap[id];
        if (queue) {
            for(var i = queue.length - 1; i >= 0; --i) {
                queue[i]();
            }
            delete loadingMap[id];
        }
    };

    require = function(id) {
        id = require.alias(id);

        var mod = modulesMap[id];
        if (mod) {
            return mod.exports;
        }

        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            throw Error('Cannot find module `' + id + '`');
        }

        mod = modulesMap[id] = {
            'exports': {}
        };

        //
        // factory: function OR value
        //
        var ret = (typeof factory == 'function')
                ? factory.apply(mod, [require, mod.exports, mod])
                : factory;

        if (ret) {
            mod.exports = ret;
        }
        return mod.exports;
    };

    require.async = function(names, callback) {
        if (typeof names == 'string') {
            names = [names];
        }

        for(var i = names.length - 1; i >= 0; --i) {
            names[i] = require.alias(names[i]);
        }

        var needMap = {};
        var needNum = 0;

        function findNeed(depArr) {
            for(var i = depArr.length - 1; i >= 0; --i) {
                //
                // skip loading or loaded
                //
                var dep = depArr[i];
                if (dep in factoryMap || dep in needMap) {
                    continue;
                }

                needMap[dep] = true;
                needNum++;
                loadScript(dep, updateNeed);

                var child = resMap[dep];
                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
            }
        }

        function updateNeed() {
            if (0 == needNum--) {
                var i, args = [];
                for(i = names.length - 1; i >= 0; --i) {
                    args[i] = require(names[i]);
                }
                callback && callback.apply(self, args);
            }
        }

        findNeed(names);
        updateNeed();
    };

    require.resourceMap = function(obj) {
        resMap = obj['res'] || {};
        pkgMap = obj['pkg'] || {};
    };

    require.alias = function(id) {return id};

    define.amd = {
        'jQuery': true,
        'version': '1.0.0'
    };

})(this);

(function(){
    var list = [];

    var emptyFn = function(){};

    var _getContainers = function(tag){

        if(!tag){
            return [];
        }

        var containers = [];
        var rawContainers = document.querySelectorAll('.' + tag);

        for (var i = 0; i < rawContainers.length; i++) {
            containers.push(rawContainers[i]);
        }

        return containers;

    };

    var _Cpt = function(fn, container){
        this.fn = fn;
        this.container = container;
    };

    _Cpt.prototype.$ = function(selector){
        return $(selector, this.container);
    };

    var invoke = function(tag, fn){
        var containers = _getContainers(tag);


        for (var k = 0; k < containers.length; k++) {
            var container = containers[k];
            var invoked = 0;
            try{
                invoked = parseInt(container.getAttribute('data-invoked'));
            }catch(e){}

            if(invoked === 1){
                console.log('already invoked');
                return;
            }

            var aCpt = new _Cpt(fn || emptyFn, container);
            list.push(aCpt);
            aCpt.fn.call(aCpt);
            container.setAttribute('data-invoked', 1);
        }
    };

    window.Rosetta = window.Rosetta || {};
    window.Rosetta.invoke = invoke;

})();
(function () {
    var win = window,
        doc = document,

        decode = decodeURIComponent,
        encode = encodeURIComponent,

        isSupportLocalStorage = (function() {

            try {
                var support = 'localStorage' in win && win['localStorage'] !== null,
                    test = {
                        k: 'test key',
                        v: 'test value'
                    };
                if (support) {
                    localStorage.setItem(test.k, test.v);
                    support = test.v === localStorage.getItem(test.k);
                }
                return support;
            } catch (e) {
                return false;
            }
        }()),

        stringify = function(v) {
            if (!_.isString(v)) {
                v = JSON.stringify(v);
            }
            return encode(v);
        },

        validateCookieName = function(name) {
            if (!_.isString(name) || name === '') {
                throw new TypeError('Cookie name must be a non-empty string');
            }
        },

        // TODO: 不支持localStorage时换用cookie存储
        // 现在在某些浏览器下可能存在cookie数量的限制
        // 之后可能的优化是使用subcookie的方式: https://developer.yahoo.com/yui/cookie/#subcookies
        s = isSupportLocalStorage ? localStorage : {
            setItem: function(k, v) {
                validateCookieName(k);

                // 默认cookie中的结果缓存1天
                var expires = new Date(+new Date() + 86400000);

                v = _.utils.evaluate(v);
                if (_.isArray(v)) {
                    v = v[0];
                    expires = new Date(parseInt(v[1], 10));
                }

                k = stringify(k);
                v = stringify(v);

                // 高端浏览器中一般合并字符用+比用join('')更高效
                // 参考: http://photo.weibo.com/2785671884/wbphotos/large/photo_id/3453950944633013?refer=weibofeedv5
                doc.cookie = k + '=' + v + '; expires=' + expires.toGMTString();
            },

            getItem: function(k) {
                validateCookieName(k);

                k = stringify(k) + '=';

                var v = null,
                    cookie = doc.cookie,
                    start = cookie.indexOf(k);

                if (start > -1) {
                    var end = cookie.indexOf(';', start);
                    if (end === -1) {
                        end = cookie.length;
                    }
                    v = decode(cookie.substring(start + k.length, end));
                }

                return v;
            }
        },

        prefix = 'ZDH:';

    var LocalStorage = {
        isSupportLocalStorage: isSupportLocalStorage,

        set: function(k, v, expires) {
            if (_.isNumber(expires)) {
                expires = +new Date() + expires;
                v = [v, expires];
            }
            s.setItem(prefix + k, JSON.stringify(v));
        },

        get: function(k) {
            var v = JSON.parse(s.getItem(prefix + k)),
                expires;

            if (!v) {
                return;
            }

            // 有expires的情况
            if (_.isArray(v)) {
                expires = parseInt(v[1], 10);
                if (+new Date() < expires) {
                    return v[0];
                }
                this.remove(k);
            } else {
                return v;
            }
        },

        remove: function(k) {
            s.removeItem(prefix + k);
        }
    };

    window.Rosetta = window.Rosetta || {};

    window.Rosetta.LocalStorage = LocalStorage;
})();
var BigPipe = function() {

    var pagelets = [],
        loadedResource = {},
        container,
        containerId,
        pageUrl = location.pathname + (location.search ? "?" + location.search : ""),
        resource,
        resourceCache = {},
        onReady,
        initiatorType = {
            LANDING     : 0,        // 发起者类型
            QUICKLING   : 1,
            FROM_CACHE  : 2
        },
        LOADED = 1,
        lazyRender = false,
        cacheMaxTime = 5 * 60 * 1000;

    function parseJSON (json) {
        return window.JSON? JSON.parse(json) : eval('(' + json + ')');
    }


    function ajax(url, cb, data) {
        var xhr = new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");

        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                cb(this.responseText);
            }
        };
        xhr.open(data?'POST':'GET', url + '&t=' + ~~(Math.random() * 1e6), true);

        if (data) {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }

    function getCommentById(html_id) {
        //
        // 取出html_id元素内保存的注释内容
        //
        var dom = document.getElementById(html_id);
        if (!dom) {
            return "";
        }
        var html = dom.firstChild.nodeValue;
        html = html.substring(1, html.length - 1).
            replace(/\\([\s\S]|$)/g,'$1');
        dom.parentNode.removeChild(dom);
        return html;
    }

    function renderPagelet(obj, pageletsMap, rendered) {
        if (obj.id in rendered) {
            return;
        }
        rendered[obj.id] = true;

        if (obj.parent_id) {
            renderPagelet(
                pageletsMap[obj.parent_id], pageletsMap, rendered);
        }

        //
        // 将pagelet填充到对应的DOM里
        //
        var dom = document.getElementById(obj.id);
        if (!dom) {
            dom = document.createElement('div');
            dom.id = obj.id;
            if (container) {
                container.appendChild(dom);
            } else {
                document.body.appendChild(dom);
            }
        }
        dom.innerHTML = obj.html || getCommentById(obj.html_id);
    }


    function render(options) {
        var i, n = pagelets.length;
        var pageletsMap = {};
        var rendered = {};
        var options = options || {};

        //
        // pagelet.id => pagelet 映射表
        //
        for(i = 0; i < n; i++) {
            var obj = pagelets[i];
            pageletsMap[obj.id] = obj;
        }

        if (!lazyRender) {
            for(i = 0; i < n; i++) {
                renderPagelet(pagelets[i], pageletsMap, rendered);
            }
        }

        if(options.trigger === true) {
            trigger('pagerendercomplete', {
                'url': pageUrl,
                'resource': resource
            });
        }
    }


    function process(rm, cb) {
        if (rm.async) {
            require.resourceMap(rm.async);
        }
        var css = getNeedLoad(rm.css);

        function loadNext() {
            var js = getNeedLoad(rm.js);

            if (rm.style) {
                var dom = document.createElement('style');
                dom.innerHTML = rm.style;
                document.getElementsByTagName('head')[0].appendChild(dom);
            }

            cb();

            if (js) {
                LazyLoad.js(js, function() {
                    recordLoaded(js);
                    rm.script && window.eval(rm.script);
                    trigger("onpageloaded");
                });
            }
            else {
                rm.script && window.eval(rm.script);
                trigger("onpageloaded");
            }
        }

        css
            ? LazyLoad.css(css.reverse(), function(){
                recordLoaded(css);
                loadNext();
            })
            : loadNext();
    }


    function getLoadedScript () {
        $script = $('script');

        for(var i = 0; i < $script.length; i++) {
            var $item = $($script[i]),
                src = $item.attr('src');

            loadedResource[src] = LOADED;
        }
    }

    /**
     * 获取需要加载的资源列表
     * @param  {array|string} resource 资源地址或者数组
     * @return {array}        资源列表
     */
    function getNeedLoad (resource) {
        if (JSON.stringify(loadedResource) == '{}') {
            getLoadedScript();
        }

        var needLoad = [];
        if(typeof resource === "string") {
            needLoad = [resource]
        } else if(Object.prototype.toString.call(resource) === "[object Array]") {
            for (var i = 0; i < resource.length; i++) {
                if(loadedResource[resource[i]] !== LOADED) {
                    needLoad.push(resource[i]);
                }
            };
        }

        if(needLoad.length === 0) {
            needLoad = null;
        }

        return needLoad;

    }

    /**
     * 记录下载资源
     * @param  {array|string} resource 已下载的资源
     * @return {void}
     */
    function recordLoaded (resource) {
        var needCache = resource;
        if(typeof needCache === "string") {
            needCache = [needCache];
        }

        for (var i = 0; i < needCache.length; i++) {
            loadedResource[resource[i]] = LOADED;
        };

    }

    function register(obj) {
        process(obj, function() {
            render({trigger:true});
            if(typeof onReady === "function") {
                onReady();
            }
        });
    }

    function fetch(url, id, options, callback) {
        //
        // Quickling请求局部
        //
        var currentPageUrl = location.href,
            options = options || {},
            eventOptions = {},
            data;
        containerId = id;

        var success = function(data, opts){
            // 如果数据返回回来前，发生切页，则不再处理，否则当前页面有可能被干掉
            if(currentPageUrl !== location.href) {
                return;
            }

            if (id == containerId) {
                pageUrl = url;
                var json = parseJSON(data);
                resource = json;

                // 处理前派发页面到达事件
                trigger('pagearrived', opts);

                onPagelets(json, id, callback);
            }
        }

        // 缓存策略
        if(isCacheAvailable(url) && options.cache !== false) {
            data = getCachedResource(url);
            // initiator标识发起者参数
            eventOptions.initiator = initiatorType.FROM_CACHE;
            success(data, eventOptions);
            // 统计URL
            statRecord(url);
        } else {
            ajax(url, function(data){
                eventOptions.initiator = initiatorType.QUICKLING;
                addResourceToCache(url,data);
                success(data, eventOptions);
            });
        }
    }

    function refresh(url, id, options, callback) {
        lazyRender = options.lazyRender;
        fetch(url, id, options, callback);
    }

    /**
     * 异步加载pagelets
     */
    function asyncLoad(pageletIDs, param) {
        if (!(pageletIDs instanceof Array)) {
            pageletIDs = [pageletIDs];
        }

        var i, args = [],
            currentPageUrl = location.href;
        for(i = pageletIDs.length - 1; i >= 0; i--) {
            var id = pageletIDs[i].id;
            if (!id) {
                throw Error('[BigPipe] missing pagelet id');
            }
            args.push('pagelets[]=' + id);
        }

        param = param ? '&' + param : '';

        var url = location.href.split('#')[0] + '&' + args.join('&') + '&force_mode=1&is_widget=true' +param;

        // 异步请求pagelets
        ajax(url, function(res) {
            // 如果数据返回回来前，发生切页，则不再处理，否则当前页面有可能被干掉
            if(currentPageUrl !== location.href) {
                return;
            }

            var data = parseJSON(res);
            resource = data;
            pageUrl = url;
            pagelets = data.pagelets;
            process(data.resource_map, function() {
                render();
            });
        });
    }

    /**
     * 记录统计
     * @param  {String} url
     */
    function statRecord(url){
        if(typeof url === "string") {
            var sep = url.indexOf('?') === -1 ? "/?" : "&";
            url = url + sep + "pagecache=1";
            ajax(url,function(res){
                //console.log("%ccache stat","color:red");
            });
        }
    }

    function addResourceToCache(url,resource){
        resourceCache[url] = {
            data : resource,
            time : Date.now()
        };
    }

    function getCachedResource(url) {
        if(resourceCache[url]) {
            return resourceCache[url].data;
        }
    }

    function isCacheAvailable(url) {
        return !!resourceCache[url] && Date.now() - resourceCache[url].time <= cacheMaxTime;
    }

    /**
     * 添加一个pagelet到缓冲队列
     */
    function onPageletArrived(obj) {
        pagelets.push(obj);
    }

    function onPagelets(obj, id, callback) {
        //
        // Quickling请求响应
        //
        if (obj.title) {
            document.title = obj.title;
        }

        //
        // 清空需要填充的DOM容器
        //
        container = document.getElementById(id);
        container.innerHTML = '';
        pagelets = obj.pagelets;


        process(obj.resource_map, function() {
            callback && callback();
            render({trigger:true});
        });
    }

    function onPageReady(f) {
        onReady = f;
        trigger('pageready', pagelets);
    }

    function onPageChange(pid) {
        fetch(location.pathname +
            (location.search? location.search + '&' : '?') + 'pagelets=' + pid);
    }


    // -------------------- 事件队列 --------------------
    var SLICE = [].slice;
    var events = {};

    function trigger(type /* args... */) {
        var list = events[type];
        if (!list) {
            return;
        }

        var arg = SLICE.call(arguments, 1);
        for(var i = 0, j = list.length; i < j; i++) {
            var cb = list[i];
            if (cb.f.apply(cb.o, arg) === false) {
                break;
            }
        }
    }

    function on(type, listener, context) {
        var queue = events[type] || (events[type] = []);
        queue.push({f: listener, o: context});
    }


    return {
        asyncLoad: asyncLoad,
        register: register,
        refresh: refresh,

        onPageReady: onPageReady,
        onPageChange: onPageChange,

        onPageletArrived: onPageletArrived,
        onPagelets: onPagelets,

        on: on,
        trigger: trigger
    }
}();
/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/**
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
*/

LazyLoad = (function (doc) {
  // -- Private Variables ------------------------------------------------------

  // User agent and feature test information.
  var env,

  // Reference to the <head> element (populated lazily).
  head,

  // Requests currently in progress, if any.
  pending = {},

  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,

  // Queued requests.
  queue = {css: [], js: []},

  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;

  // -- Private Methods --------------------------------------------------------

  /**
  Creates and returns an HTML element with the specified name and attributes.

  @method createNode
  @param {String} name element name
  @param {Object} attrs name/value mapping of element attributes
  @return {HTMLElement}
  @private
  */
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  /**
  Called when the current pending resource of the specified type has finished
  loading. Executes the associated callback (if any) and loads the next
  resource in the queue.

  @method finish
  @param {String} type resource type ('css' or 'js')
  @private
  */
  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE|Trident/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  /**
  Loads the specified resources, or the next resource of the specified type
  in the queue if no resources are specified. If a resource of the specified
  type is already being loaded, the new request will be queued until the
  first request has been finished.

  When an array of resource URLs is specified, those URLs will be loaded in
  parallel if it is possible to do so while preserving execution order. All
  browsers support parallel loading of CSS, but only Firefox and Opera
  support parallel loading of scripts. In other browsers, scripts will be
  queued and loaded one at a time to ensure correct execution order.

  @method load
  @param {String} type resource type ('css' or 'js')
  @param {String|Array} urls (optional) URL or array of URLs to load
  @param {Function} callback (optional) callback function to execute when the
    resource is loaded
  @param {Object} obj (optional) object to pass to the callback function
  @param {Object} context (optional) if provided, the callback function will
    be executed in this object's context
  @private
  */
  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      // Create a request object for each URL. If multiple URLs are specified,
      // the callback will only be executed after all URLs have been loaded.
      //
      // Sadly, Firefox and Opera are the only browsers capable of loading
      // scripts in parallel while preserving execution order. In all other
      // browsers, scripts must be loaded sequentially.
      //
      // All browsers respect CSS specificity based on the order of the link
      // elements in the DOM, regardless of the order in which the stylesheets
      // are actually downloaded.
      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls;

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          var loaded;
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          loaded = pollWebKit();

          if (loaded) {
            i--;
            len = pendingUrls.length;
            continue;
          }
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  /**
  Begins polling to determine when the specified stylesheet has finished loading
  in Gecko. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  Thanks to Zach Leatherman for calling my attention to the @import-based
  cross-domain technique used here, and to Oleg Slobodskoi for an earlier
  same-domain implementation. See Zach's blog for more details:
  http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

  @method pollGecko
  @param {HTMLElement} node Style node to poll.
  @private
  */
  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i, ret = false;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          ret = true;
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          // We've been polling for 10 seconds and nothing's happened, which may
          // indicate that the stylesheet has been removed from the document
          // before it had a chance to load. Stop polling and finish the pending
          // request to prevent blocking further requests.
          finish('css');
        }
      }
    }
    return ret;
  }

  return {

    /**
    Requests the specified CSS URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified, the stylesheets will be loaded in parallel and the callback
    will be executed after all stylesheets have finished loading.

    @method css
    @param {String|Array} urls CSS URL or array of CSS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified stylesheets are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    /**
    Requests the specified JavaScript URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified and the browser supports it, the scripts will be loaded in
    parallel and the callback will be executed after all scripts have
    finished loading.

    Currently, only Firefox and Opera support parallel loading of scripts while
    preserving execution order. In other browsers, scripts will be
    queued and loaded one at a time to ensure correct execution order.

    @method js
    @param {String|Array} urls JS URL or array of JS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified scripts are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);
(function(w, undefined) {
    var exports = w,
        cache = {},         // resourceMap cache
        cacheMaxTime = 0,   // 缓存时间
        appOptions = {},    // app页面管理的options
        curPageUrl,
        isPushState,
        layer,              // 事件代理层
        urlReg = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;

    /**
     * 启动页面管理
     * @param  {Object} options 初始化参数
     * @param {String} options["selector"] 全局代理元素的选择器匹配，写法同 document.querySeletor 函数
     * @param {Number} options["cacheMaxTime"] 页面缓存时间
     * @param {Function|RegExp} options["validate"] url验证方法，
     * @return {void}
     */

    function start(options) {

        /**
         * 默认参数 {
         *     selector : <string> // 代理元素的选择器规则
         *     cacheMaxTime: <integer> //缓存存活时间，默认5min
         * }
         */
        var defaultOptions = {
            selector: "a,[data-href]",
            cacheMaxTime: 5 * 60 * 1000,
            pushState : true,
            layer : document.body
        };

        appOptions = merge(defaultOptions, options);
        cacheMaxTime = appOptions.cacheMaxTime;
        isPushState = appOptions.pushState;
        layer = getLayer(appOptions.layer);

        curPageUrl = getCurrentUrl();

        if(isPushState === true){
            // 绑定事件
            bindEvent();
        }
    }

    /**
     * 事件绑定
     * @return {void}
     */

    function bindEvent() {
        // 处理history.back事件
        window.addEventListener('popstate', onPopState, false);
        // 全局接管指定元素点击事件
        layer.addEventListener('click', proxy, true);
        // bigpipe回调事件
        BigPipe.on('pagerendercomplete', onPagerendered, this); // 执行完页面的ready函数后触发

        // 页面数据到达的时候派发事件
        BigPipe.on('pagearrived', onPageArrived, this);

        // 页面内所有的样式JS都被加载完成后触发
        BigPipe.on('onpageloaded', onPageLoaded, this);
    }

    function getLayer(ele) {
        if(typeof ele === "string") {
            return document.querySelector(ele);
        } else if (ele && ele.nodeType) {
            return ele;
        } else {
            return document.body
        }

    }


    /**
     * 处理popstate事件，响应历史记录返回
     * @param  {PopStateEvent} e popstate事件对象
     * @return {void}
     */

    function onPopState(e) {

        var currentUrl = getCurrentUrl();

        if (!curPageUrl || currentUrl === curPageUrl) {
            return;
        }

        trigger('onpagerenderstart');
        fetchPage(currentUrl, e.state);
    }

    /**
     * 渲染完成事件函数
     * @param  {String} obj bigpipe回传事件参数
     * @return {void}
     */

    function onPagerendered(obj) {
        cache[obj.url] = {
            resource: obj.resource,
            time: Date.now()
        };

        //page render end
        trigger('onpagerendercomplete',{
            url : obj.url
        });
    }

    function onPageArrived(options){
        trigger('onpagearrived',options);
    }

    function onPageLoaded() {
        trigger('onpageloaded');
    }

    /**
     * 简单merge两个对象
     * @param {object} _old
     * @param {object} _new
     * @returns {*}
     */

    function merge(_old, _new) {
        for (var i in _new) {
            if (_new.hasOwnProperty(i)) {
                _old[i] = _new[i];
            }
        }
        return _old;
    }

    /**
     * 事件代理
     * @param {MouseEvent} 点击事件对象
     */

    function proxy(e) {
        var element = e.target,
            parent = element,
            selector = appOptions.selector;


        while (parent !== document.body) {

            if (matchSelector(parent, selector)) {

                urlAttr = parent.tagName.toLowerCase() === "a" ? "href" : "data-href";


                url = parent.getAttribute(urlAttr);

                // 验证url, 可以自行配置url验证规则
                if (validateUrl(url)) {
                    e.stopPropagation();
                    e.preventDefault();

                    var opt = {
                        replace: parent.getAttribute("data-replace") || false,
                        containerId: parent.getAttribute("data-area") || 'pager',
                        pagelets: parent.getAttribute("data-area") || 'pager',
                        target : parent
                    }

                    redirect(url, opt);
                }
                return;
            } else {
                parent = parent.parentNode;
            }
        }
    }

    /**
     * 检查元素是否匹配选择器
     * @param  {HTMLElement} element
     * @param  {String} selector 选择器规则
     * @return {boolean}
     */

    function matchSelector(element, selector) {
        if (!element || element.nodeType !== 1) {
            return false
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

    /**
     * 验证URL是否符合validate规则
     * @param  {string} url
     * @return {boolean}
     */

    function validateUrl(url) {
        var validate = appOptions.validate,
            type = Object.prototype.toString.call(validate);

        if (type === "[object RegExp]") {
            return validate.test(url);
        } else if (type === "[object Function]") {
            return validate(url);
        } else {
            return true;
        }
    }

    /**
     * 获取url的pathname 和 query部分
     * @param  {String} url
     * @return {String}     返回url的pathname 和 query部分
     */

    function getUrl(url) {
        if (urlReg.test(url)) {
            return RegExp.$5 + (RegExp.$6 ? RegExp.$6 : "");
        } else {
            "console" in window && console.error("[url error]:", url);
        }

    }

    /**
     * 获取当前的url
     * @return {String} 获取当前url
     */

    function getCurrentUrl() {
        return getUrl(window.location.href)
    }

    /**
     * 跳转页面
     * @param {String} url      目标页面的url
     * @param {Object} options  跳转配置参数
     * @param {Array|String} options[pagelets]  请求的pagelets
     * @param {String} options[containerId]  pagelets渲染容器
     * @param {Boolean} options[trigger]  是否触发加载
     * @param {Boolean} options[forward]  是否替换URL
     * @param {Boolean} options[replace]  是否替换当前历史记录
     * @param {HTMLElement} options[target]  触发跳转的DOM元素
     */

    function redirect(url, options) {
        url = getUrl(url);

        // 如果url不变则不加载
        if(getCurrentUrl() === url) {
            return;
        }

        var method,
            defaultOptions = {
                trigger: true,
                forward: true,
                replace: false
            },
            eventsOptions = {
                url : url
            };


        options = merge(defaultOptions, options);
        eventsOptions.target = options.target || null;
        // tirgger 状态不进行页面获取，只切换URL
        if(options.trigger === false) {
            if(isPushState) {
                method = options.replace ? "replaceState" : "pushState";
                window.history[method]({}, document.title, url);
            }
            return;
        }

        if (!isPushState) {
            options.replace ? (location.replace(url)) : (location.href = url);
            return;
        }

        //page render start
        trigger('onpagerenderstart' , eventsOptions);

        // 之所以放在页面回调中替换历史记录，是因为在移动端低网速下
        // 有可能后续页面没有在下一次用户操作前返回，而造成添加无效历史记录的问题
        fetchPage(url, options, function(){
            if (options.forward) {
                method = options.replace ? "replaceState" : "pushState";
                window.history[method]({}, document.title, url);
            }
        });
    }

    function fetchPage (url, options, callback){
        if(!url) {
            return;
        }

        var now = Date.now(),
            options = options || {},
            pageletsParams = [],
            opt = {},
            containerId = options.containerId ? options.containerId : appOptions.containerId,
            pagelets = options.pagelets ? options.pagelets : appOptions.pagelets;

        if(typeof pagelets === "string" ) {
            pagelets = [pagelets]
        }

        curPageUrl = url;

        if (pagelets.length > 0) {
            for (var i = 0, len = pagelets.length; i < len; i++) {
                pageletsParams.push('pagelets[]=' + pagelets[i]);
            }
            url = (url.indexOf('?') === -1) ? url + '/?' + pageletsParams.join('&') : url + '&' + pageletsParams.join('&');
        }

        opt.lazyRender = options.lazyRender;
        (options.cache === false) && (opt.cache = false);

        BigPipe.refresh(url, containerId, opt, function(){
            callback && callback();
        })
    }

    // -------------------- 事件队列 --------------------
    var SLICE = [].slice;
    var events = {};

    function trigger(type /* args... */ ) {
        var list = events[type];
        if (!list) {
            return;
        }

        var arg = SLICE.call(arguments, 1);
        for (var i = 0, j = list.length; i < j; i++) {
            var cb = list[i];
            if (cb.f.apply(cb.o, arg) === false) {
                break;
            }
        }
    }

    function on(type, listener, context) {
        var queue = events[type] || (events[type] = []);
        queue.push({
            f: listener,
            o: context
        });
    }

    exports.appPage = {
        start: start,
        redirect: redirect,
        on: on
    };

    window.Rosetta = window.Rosetta || {};
    window.Rosetta.appPage = exports.appPage;

    // // 模块化支持
    // if ("define" in window && typeof module != "undefined") {
    //     module.exports = exports.appPage
    // }

})(this);