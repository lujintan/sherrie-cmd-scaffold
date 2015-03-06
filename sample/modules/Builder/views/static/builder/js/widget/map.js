/**
 * 调用方法
 *
 * var options = {
 *  //to do
 * }
 * var shopMap = require('order/js/shop_map');
 * shopMap.init(options);
 */
define(['page/config'], function(config) {

	var endPoint = {},
		startPoint = {},
		textAddr = '',
		map = null,
		mapGeo = null,
		endPointlin = {},
		marker = null,
		originalPoint = null;

	var _init = function(options) {
		options = options || {};
		textAddr = options.addr;
		startPoint.lat = options.lat;
		startPoint.lng = options.lng;

		originalPoint = $.extend({}, startPoint);
		// endPoint = startPoint;
		_loadMap(options);
	};
	var _loadMap = function(options) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + config.ak + "&callback=createShopMap";
		document.body.appendChild(script);
	};
	window.createShopMap = function(options) {
		map = new BMap.Map('allmap'),
			opts = {
				type: BMAP_NAVIGATION_CONTROL_ZOOM
			};

		map.addControl(new BMap.NavigationControl(opts));

		if (startPoint.lng && startPoint.lat) {
			var point = new BMap.Point(startPoint.lng, startPoint.lat);
			_createPoint(map, point);
		} else {
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		}

		mapGeo = new BMap.Geocoder();
	};
	var _createPoint = function(map, point) {
		if (marker) {
			marker.setPosition(point);
			map.centerAndZoom(point, 14);
		} else {
			var label = new BMap.Label("拖动此图标到正确位置", {
				offset: new BMap.Size(20, -10)
			});
			label.setStyle({
				backgroundColor: "#f3e9e9",
				color: "#ff2a06",
				fontSize: "12px",
				lineHeight: "20px",
				padding: "3px"
			});
			map.centerAndZoom(point, 14);
			marker = new BMap.Marker(point);
			map.addOverlay(marker);
			marker.enableDragging();
			marker.setLabel(label);

			marker.addEventListener('dragend', function(e) {
				$('.confirm-dialog-wrapper').removeClass('mp-manage-dialog-dis');
				endPointlin.lat = e.point.lat;
				endPointlin.lng = e.point.lng;
			});
			_bindEvent();
		}
		endPoint.lat = point.lat;
		endPoint.lng = point.lng;
	};
	var _bindEvent = function() {
		$('.btn-remark').on('click', function(e) {
			e.preventDefault();
			endPoint.lat = endPointlin.lat;
			endPoint.lng = endPointlin.lng;
			$('.confirm-dialog-wrapper').addClass('mp-manage-dialog-dis');
		});
		$('.btn-unremark').on('click', function(e) {
			e.preventDefault();
			var point = new BMap.Point(endPoint.lng, endPoint.lat);
			_createPoint(map, point);
			$('.confirm-dialog-wrapper').addClass('mp-manage-dialog-dis');
		});
	};

	var fixAddressToMap = function(address, range) {
		mapGeo.getPoint(address, function(point) {
			if (point) {
				var point = new BMap.Point(point.lng, point.lat);
				_createPoint(map, point);
			}
		}, range || "中国");
	};

	var getPoint = function() {
		return endPoint;
	};

	var reset = function() {
		endPoint = originalPoint||{};

		if (endPoint.lng&&endPoint.lat) {
			var point = new BMap.Point(endPoint.lng, endPoint.lat);
			marker.setPosition(point);
			map.centerAndZoom(point, 14);
		} else {
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		}
	};

	var savePoint = function() {
		originalPoint = $.extend(true, {}, endPoint);
	}

	return {
		createMap: _init,
		fixAddressToMap: fixAddressToMap,
		getPoint: getPoint,
		reset: reset,
		savePoint:savePoint
	}
});