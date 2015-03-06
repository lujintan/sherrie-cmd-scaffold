var option = {
    ele: '.mp-spot-oldtown',

    init: function() {
        var $page = $('.mp-page-oldtown');
        var $win = $(window);
        var $body = $('.nav-container');
        var showMenu = function(num) {
            $page.find('.mod-block').slice(0, num).addClass('nav-animation');
        };
        var showMenuNum = function() {
            return Math.ceil(($win.height() + $body.scrollTop()) / 120);
        }

        showMenu(showMenuNum());

        $body.on('scroll', _.throttle(function() {
            showMenu(showMenuNum());
        }, 100));
    },

    events: {}
};


module.exports = Ofa.Component(option);