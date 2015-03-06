var option = {
	ele: '.mp-spot-hotspring',

	init: function() {
		if ((/MQQB/.test(window.navigator.userAgent) || /baiduboxapp\/5/.test(window.navigator.userAgent)) && /Android/.test(window.navigator.userAgent)) {
			$('.mp-spot-nav img').each(function(index, val) {
				$(this).attr('src', $(this).data('src'));
			});
			$('.mp-spot-nav img').show();
			$('.mp-spot-nav i').hide();
		}
	},
	events: {}
}

module.exports = Ofa.Component(option);