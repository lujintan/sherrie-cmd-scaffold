var option = {
	ele: '.mp-spot-playground',

	init: function() {
		var blockList = $(".nav-container").find(".mod-block");
		blockList.each(function(e) {
			setTimeout(function() {
				$(blockList.get(e)).animate({
					opacity: 1,
					rotate: '45deg'
				}, 500, "ease-out")
			}, $(blockList.get(e)).attr("data-delay"))
		});
	},

	events: {}
};


module.exports = Ofa.Component(option);