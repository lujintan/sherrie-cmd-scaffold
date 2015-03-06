define(function() {
	var online = window.location.host == "hotspot.baidu.com" ? true:false,
		config = {
			ak: "GfmeECLCPSeto8Fj8fDHL3pY",
			uploadurl: online ? "http://appbuilder.baidu.com/cms/upload" : "http://xappbuilder.newoffline.bae.baidu.com/cms/upload",
			navconfig: {
				landscape: true,
				skiing: true,
				oldtown: true,
				archeology: true
			},
			modulesConfig: {
				required: {
					'introduce': true,
					'ordercenter': true,
					'tickets': true
				},
				order: {
					tickets: 0,
					introduce: 1,
					weather: 2,
					routes: 3,
					gallery: 4,
					spotlist: 5,
					heatmap: 6,
					tourguide: 7,
					ordercenter: 8
				}
			}
		};

	return config;
});