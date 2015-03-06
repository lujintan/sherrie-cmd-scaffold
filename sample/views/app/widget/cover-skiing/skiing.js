var option = {
    ele: '.mp-spot-skiing',

    init: function() {
        var $skiing = $('.mp-spot-skiing');
        var screenH = $(window).height();
        var showMenu = function(num) {
            $skiing.find('.swiper-slide').slice(0, num).addClass('swiper-slide-show');
        }

        showMenu(3);

        // var mySwiper = new Swiper('.swiper-container', {
        //     mode: 'vertical',
        //     slidesPerView: 'auto',
        //     calculateHeight: false,
        //     watchActiveIndex: true,
        //     offsetPxAfter: 150,
        //     offsetPxBefore: screenH * .6,
        //     onTouchMove: _.throttle(function(e) {
        //         showMenu((-e.positions.current / 50) | 1);
        //     }, 200)
        // });
    },

    events: {

    }
};


module.exports = Ofa.Component(option);