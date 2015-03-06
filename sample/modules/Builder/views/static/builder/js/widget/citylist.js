define(['jquery'], function () {


	window.callback = function(data) {
		window.BuilderEvent.fire("citylist", data);
	}

	function fetcthData(options){
		var param = $.extend(true, {
			qt:'sub_area_list',
			ext:1,
			level:1,
			areacode:1,
			business_flag:0
		}, options), url = 'http://api.map.baidu.com/shangquan/forward/?callback=callback&jsoncallback=?';

		$.getJSON(url, param, function () {
			console.log('success');
			alert(1);
		});
	
	}

	return {
		fetchCityData:fetcthData
	}
})