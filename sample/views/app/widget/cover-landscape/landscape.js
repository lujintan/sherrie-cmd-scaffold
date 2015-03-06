var option = {
    ele: '.mp-page-landscape',

    init: function () {
        var $skiing = $('.mp-spot-landscape');
        var screenW = $(window).width();
        var showMenu = function (num) {
            $skiing.find('.swiper-slide').slice(0, num).addClass('swiper-slide-show');
        }

        showMenu(3);

        var slideList = $(".swiper-container").find(".swiper-slide");
        slideList.each(function(e) {
            setTimeout(function() {
                $(slideList.get(e)).animate({opacity: 1,translate3d: "0, 0, 0"}, 500, "ease-out")
            }, $(slideList.get(e)).attr("data-delay"))
        });
    },

    events: {

    }
};


module.exports = Ofa.Component(option);