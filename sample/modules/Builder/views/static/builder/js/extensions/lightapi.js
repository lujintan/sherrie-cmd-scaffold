define(['lightapp', 'jquery'], function() {
	var LightApi = {
		setValue: function(name, value, cb) {
			lightapp.get(name, function(err, res) {
				if (res) {
					if (typeof(value) == "object") {
						res = $.extend(true, res, value)
					} else {
						res[name] = value;
					}
					lightapp.set(name, res, cb);
				} else {
					lightapp.set(name, value, cb);
				}

			});
		}
	};

	LightApi = $.extend(true, LightApi, lightapp);
	return LightApi;
});