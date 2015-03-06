define(['jquery'], function(){


	function initCount(el){
		var inputs = $(el).find('[node-type="inputtext"]');

		$.each(inputs, function(i, v){
			var input = $(v), value = input.val(), limit = input.siblings("sup");
			limit.find("i[node-type=inputnumber]").html(value.length);
		})
	}


	function init(el) {
		$(el).delegate('[node-type="inputtext"]', "keyup", function(e) {
			var target = $(e.target), value = target.val(), limit = target.siblings("sup");
			limit.find("i[node-type=inputnumber]").html(value.length);
		});	

		$(el).delegate('[node-type="inputtext"]', "click", function(e) {
			var target = $(e.target);
			target.parent().addClass("mp-manage-input-text-focus");
		});		

		$(el).delegate('[node-type="inputtext"]', "blur", function(e) {
			var target = $(e.target);
			target.parent().removeClass("mp-manage-input-text-focus");
		});

		initCount(el);
	}

	return {
		init:init,
		initCount:initCount
	}

})