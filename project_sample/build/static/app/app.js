define('app:static/js/core/utils.js', function(require, exports, module){ var utils = {
    log: function (type, log) {
        clouda.lego.monitor.send("click",{
            name: "call",
            value: log
        });
    },

    unParam: function (str) {
        var re = {};

        if (str) {
            str = str.split('&');
            _.each(str, function(item) {
                item = item.split('=');
                re[item[0]] = item[1];
            });
        }

        return re;
    },

    getRealPathname: function () {
        return window.location.pathname.replace(/\//gi, '');
    }
};

module.exports = utils;
 });
;define('app:static/js/app/app.js', function(require, exports, module){ var app = {
    ele: 'body',

    init: function() {
        window.$doc = $(document);
        window.$body = $('body');
        window.$loading = $('#page-loading');
        window.$pager = $('#pager');
        window.$preLoad = $('#pre_load');

        this.clickInit();
        this.appPageInit();
        this.preFetchPage();
    },

    clickInit: function() {
        var fc, findActive, oldEnd, oldMove, oldStart, proto;
        proto = FastClick.prototype;
        oldStart = proto.onTouchStart;
        oldMove = proto.onTouchMove;
        oldEnd = proto.onTouchEnd;
        fc = new FastClick(document.body);
        findActive = function($el) {
            if ($el.hasClass('need-active') || !!$el.attr('data-href') || $el.is('a')) {
                return $el;
            } else {
                return $el.parents('.need-active, *[data-href], a').first();
            }
        };

        proto.onTouchStart = function(e) {
            $(document).bind('scroll', function() {
                $('.active').removeClass('active');
                return $(document).unbind('scroll');
            });
            $('.active').removeClass('active');
            findActive($(e.target)).addClass('active');
            return oldStart.call(fc, e);
        };
        proto.onTouchMove = function(e) {
            var r;
            r = oldMove.call(fc, e);
            findActive($(e.target)).removeClass('active');
            return r;
        };
        proto.onTouchEnd = function(e) {
            var r;
            r = oldEnd.call(fc, e);
            findActive($(e.target)).removeClass('active');
            return r;
        };
    },

    events: {
        '.log click': function () {
            var log = $(this).data('log') || {};

            if (_.isString(log)) {
                log = JSON.parse(log);
            }

            type = log.type || 'click';
            _.utils.log(type, log);
        }
    },


    changeClass: function () {
        var pathname = _.utils.getRealPathname(),
            cname = 'route-' + (pathname || 'cover');

        $body.removeClass().addClass(cname);
    },

    appPageInit: function () {
        var self = this;

        Rosetta.appPage.start({
            containerId: 'pager',
            pagelets: 'pager',
            validate: /^"http*/,
            cache: true
        });

        Rosetta.appPage.on('onpagerenderstart', function(e) {
            if ($preLoad.hasClass('slide-show')) {
                $preLoad.removeClass('slide-show');
            }
            if (e && e.target && e.target.getAttribute("data-area") == 'pre_load') {
                $preLoad.append($loading.css('visibility', 'visible'));

                $preLoad.addClass('slide-show');
            } else if (e && e.target) {
                $loading.css('visibility', 'visible');
            }
        });

        Rosetta.appPage.on('onpagerendercomplete', function(e) {
            self.changeClass();
            $loading.css('visibility', 'hidden');
        });


        var pathname = _.utils.getRealPathname();

        if (pathname === 'apppagepage') {
            $preLoad.addClass('slide-base').show();
        }
    },

    preFetchPage: function () {
        $(function () {
            var $preLoads = $('a[data-area=pre_load]');
            _.each($preLoads, function (item) {
                var $item = $(item),
                    url = $item.attr('href') || $item.attr('data-href');

                Rosetta.appPage.redirect(url, {
                    replace: false,
                    containerId:'pre_load',
                    pagelets:'pre_load',
                    target:'',
                    forward: false,
                    cache: true,
                    lazyRender: true
                });
            });
        });
    }

};

module.exports = Rosetta.Component(app); });
;(function () {
    window._ = window._ || {};
    _.utils = require('app:static/js/core/utils.js');
    var App = require('app:static/js/app/app.js');

    var app = new App();
    var ZDH = {};

    ZDH.app = app;
})();