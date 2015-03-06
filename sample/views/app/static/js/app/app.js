/**
 * @author gaojiexuan@baidu.com
 *
 * 每位工程师都有保持代码优雅的义务
 */



var app = {
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

        appPage.start({
            containerId: 'pager',
            pagelets: 'pager',
            validate: /^[\w\W]*\/\?/,
            cache: true
        });

        appPage.on('onpagerenderstart', function(e) {
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

        appPage.on('onpagerendercomplete', function(e) {
            self.changeClass();
            $loading.css('visibility', 'hidden');
        });


        var pathname = _.utils.getRealPathname();

        if (pathname === '') {
            $preLoad.addClass('slide-base').show();
        }
    },

    preFetchPage: function () {
        $(function () {
            var $preLoads = $('a[data-area=pre_load]');
            _.each($preLoads, function (item) {
                var $item = $(item),
                    url = $item.attr('href') || $item.attr('data-href');

                appPage.redirect(url, {
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

module.exports = Ofa.Component(app);