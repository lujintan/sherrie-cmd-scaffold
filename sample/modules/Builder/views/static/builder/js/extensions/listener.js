define(["jquery"], function function_name() {
	var Global = window,
		listener = {};

	Global.BuilderEvent = {};

	function bindeWindEvent() {
		Global.BuilderEvent.addEventListener = function(eventName, cb) {
			if (listener[eventName]) {
				listener[eventName].add(cb)
			} else {
				console.log("listener : there is not " + eventName + " event.");
			}
		}

		Global.BuilderEvent.fire = function(eventName, args1, args2) {
			if (listener[eventName]) {
				listener[eventName].fire(args1, args2);
			} else {
				console.log("listener : there is not " + eventName + " event.");
			}
		}

		Global.BuilderEvent.removeListener = function(eventName) {
			if (listener[eventName]) {
				listener[eventName].remove(eventName);
			} else {
				console.log("listener : there is not " + eventName + " event.");
			}
		}
	}


	function initLister(events) {
		events = events || [];

		$.each(events, function(i, v) {
			listener[v] = $.Callbacks();
		});

		bindeWindEvent();
	}

	return {
		initListener: function(events) {
			initLister(events);
		}
	}
})