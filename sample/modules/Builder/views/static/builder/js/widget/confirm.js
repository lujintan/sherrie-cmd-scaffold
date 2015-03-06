define(function() {

	var dialog = null;

	function confirm(title, message, cb) {
		if (dialog) {
			dialog.show(message);
		} else {
			require(['widget/dialog'], function(dialog) {
				dialog = new dialog({
					content: message,
					title: title,
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
	return confirm;
})