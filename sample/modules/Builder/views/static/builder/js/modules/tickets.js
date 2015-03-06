define(function() {
	var url = $('div.mp-manage-tickets').data('cms'),
		testurl = "http://1.xappbuilder.newoffline.bae.baidu.com/cms/index/113962",
		ticketFrame = $("#mp-manage-ticketsFrame"),
		loaded = false,
		contentChanged = false;

	url = window.location.host == "hotspot.baidu.com" ? url : testurl;

	window.addEventListener("message", function(event) {
		var msg = event.data;
		msg = msg || {};
		console.log(msg.action);
		if (msg.action == "set_height") {
			ticketFrame.css("height", msg.height);
		} else if (msg.action == "scroll") {
			window.scrollTo(0, msg.top);
		} else if (msg.action == "save_data") {
			window.BuilderEvent && window.BuilderEvent.fire("modulepreview", "tickets", true);
		} else if (msg.action == "page_status") {
			contentChanged = msg.modified;
		}

	}, false);


	function init() {
		window.BuilderEvent.addEventListener("moduleselect", function(moduleName) {
			if (moduleName && moduleName == "tickets") {
				if (!loaded) {

					ticketFrame[0].src = url;
					loaded = true;
				}
			}
		});

		window.BuilderEvent.addEventListener("ticketlist", function(el) {

			var message = '<p style="font-size:16px;font-family:微软雅黑;color: #333333;margin:0px;text-align:center">确认离开？</>' +
				'<p style="font-size:14px;color: #999999;margin:0px;text-align:center;margin-top:15px;">已填写内容还没保存</>',
				postion = el.offset(),
				height = el.height();

			if (contentChanged) {
				popinfo && popinfo(message, function(flag) {
					if (flag) {
						ticketFrame[0].src = url;
						contentChanged = false;
					}
				}, {
					left: postion.left,
					top: postion.top + height + 10
				});
			} else {
				ticketFrame[0].src = url;
			}
		})
	}

	init();
})