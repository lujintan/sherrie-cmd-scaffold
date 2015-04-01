var option = {
	init: function() {
		var baseTop = $("#category").offset().top;
		var curTop;
		var mdArr = [];
		window.globalCategoryArr = null;
		window.globalCategoryCur = null;
		//获取所有目录的位置
		$("h2,h3,h4,h5,h6").each(function(i, item) {
			mdArr.push($(this).offset().top);
		});

		$(document).bind("scroll", eventScroll);

		function eventScroll() {
			curTop = $(document).scrollTop();
			setNav();
			setGlobalCategoryArr();
			render();
		};

		function render() {
			globalCategoryArr.each(function(i, item) {
				var targetTop = $(this.hash).offset().top;
				if (i == 0 && curTop < targetTop) {
					$(".category-active").removeClass("category-active");
					$(this).addClass("category-active");
				} else if (curTop >= targetTop) {
					$(".category-active").removeClass("category-active");
					$(this).addClass("category-active");
				}
			})
		};

		function setGlobalCategoryArr() {
			if (!globalCategoryArr) {
				globalCategoryArr = $("a[href^=#wow]");
			}
		};

		function setNav() {
			if (curTop > baseTop) {
				$("#category").addClass("doc-fixed-top");
			} else {
				$("#category").removeClass("doc-fixed-top");
			}
		};

	},

	events: {
		//do not work
		// 'document scroll':function(){
		// 	console.log(123);
		// }
	}
};

module.exports = Rosetta.Component(option);