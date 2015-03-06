define(function() {

	var dialog = null;

	function popinfo(message, cb, position) {
		if (dialog) {
			dialog.show(message);
		} else {
			require(['widget/dialog'], function(dialog) {
				dialog = new dialog({
					content: message,
					position:position,
					topArrow:true,
					showClose:false,
					mask:false,
					title: "",
					ok: function() {
						cb(1);
					},
					cancel: function() {
						cb(0);
					}
				});
			})
		}
	}
	return popinfo;
})