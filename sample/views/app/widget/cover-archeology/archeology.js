var option = {
    ele: '.mp-spot-archeology',

    init: function() {
        var $page = $('.mp-page-archeology');
        var $win = $(window);
        var showMenu = function(num) {
            $page.find('nav li').slice(0, num).addClass('nav-animation');
        };

        var showMenuNum = function() {
            return Math.ceil(($win.height() + $win.scrollTop() - 250) / 92);
        };

        showMenu(showMenuNum());

        $win.on('scroll', _.throttle(function() {
            showMenu(showMenuNum());
        }, 200));
    },
    events: {}
}



module.exports = Ofa.Component(option);