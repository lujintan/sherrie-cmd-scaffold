define(['jquery', 'extensions/listener', 'lightapp', 'lib/jquery.qrcode.min'], function(jquery, listener) {
	var events = [
		'moduleschange', //模块选择
		'modulesave', // 模块保存
		'modulepreview'
	];
	listener.initListener(events);
	var CONSTENT = {
		colorSelected: '',
		styletype: ''
	};

	function getUrlParam(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	//@param {int} isShow 是否隐藏iframe内容
	function refresh(isShow) {
		console.log("refresh");
		if (isShow === 0) {
			$('#mp-iframe').hide();
		} else {
			$('#mp-iframe').show()
				.attr('src', $('#mp-iframe').attr('src'));
		}
	}


	function init() {
		var simulationContainer = $('.mp-manage-simulation iframe');
		simulationContainer.attr('src',
			simulationContainer.data('src') + 'token=' + getUrlParam('token') 
											+ (getUrlParam('host') ? '&host=' + getUrlParam('host') : '')
		);
		window.BuilderEvent.addEventListener('modulepreview', function(moduleName, isFresh) {
			var ifmWindow = simulationContainer[0].contentWindow,
				ifmLocation = ifmWindow.location;

			if (ifmLocation) {
				ifmLocation.hash = "/" + moduleName;
				if (moduleName == "cover") ifmLocation.hash = "";
				if (isFresh || moduleName == "cover") {
					ifmLocation.search = ifmLocation.search + "&ts+" + Date.now();
					$("#mp-iframe").attr("src", ifmLocation.href);
				}
			}
		})
	}

	//风格设置
	var layoutTemp = '';
	var colorTemp = '';

	function colorSet(colorSelected, styletype) {
		if (!styletype) {
			styletype = layoutTemp;
		} else {
			layoutTemp = styletype;
		}

		if (!colorSelected) {
			colorSelected = colorTemp;
		} else {
			colorTemp = colorSelected;
		}

		$('.mp-simulation-style-pre li[data=\'1\']')
			.find('h4').css({
				background: colorSelected,
				color: '#fff'
			}).end()
			.find('div').css({
				color: colorSelected
			}).end()
			.find('button').css({
				background: colorSelected
			});

		$('.mp-simulation-style-pre li[data=\'2\']')
			.find('h4').css({
				background: colorSelected,
				color: '#fff'
			}).end()
			.find('div').css({
				background: colorSelected,
				color: '#fff'
			}).end()
			.find('button').css({
				background: colorSelected
			});

		$('.mp-simulation-color-list span')
			.removeClass('mp-simualtion-color-selected'),
			$('.mp-simulation-color-list[data=' + colorSelected + ']')
			.find('span').addClass('mp-simualtion-color-selected');

		$('.mp-alternative-show span').hide();
		styletype && $('.mp-alternative-show[style-type=' + styletype + '] span').show();
		
		CONSTENT.colorSelected = colorSelected;
		CONSTENT.styletype = styletype;
	}

	var styleSet = function() {
		//初始化
		lightapp.get('index.style', function(err, data) {
			if (err === null && data != null) {
				var themeColor = data.themeColor || '#00a3e7';
				var layout = data.layout || 'card';
				colorSet(themeColor, layout);
			} else {
				console.log('颜色获取失败');
			}
		});
		
		$('.mp-simulation-module-style-button').on('click', function() {
			$('.mp-simulation-style-bg').show();
			$('.mp-simulation-style-container').show();
		});

		$('.mp-simulation-cancel').on('click', function() {
			$('.mp-simulation-style-bg').hide();
			$('.mp-simulation-style-container').hide();
			lightapp.get('index.style', function(err, data) {
				if (err === null && data != null) {
					var themeColor = data.themeColor;
					var layout = data.layout;
					colorSet(themeColor, layout);
				} else {
					console.log('颜色获取失败');
				}
			});
		});

		$('.mp-simulation-submit').on('click', function() {
			var colorSelected = CONSTENT.colorSelected;
			var type = CONSTENT.styletype;
			lightapp.set('index.style.themeColor', colorSelected, function(err) {
				if (err === null) {
					console.log('您选择采用配色风格：' + colorSelected);
					colorSet(colorSelected);
					// set layout
					lightapp.set('index.style.layout', type, function(err) {
						if (err === null) {
							console.log('您选择了展示风格：' + type);
							colorSet('', type);
							refresh();
						} else {
							alert('选择展示风格失败');
						}
					});
					$('.mp-simulation-style-bg').hide();
					$('.mp-simulation-style-container').hide();
				} else {
					alert('选择配色风格失败');
				}
			});

		});

		$('.mp-simulation-color-list').on('click', function() {
			var colorSelected = $(this).attr('data');

			console.log('您选择了配色风格：' + colorSelected);
			colorSet(colorSelected);
		});

		$('.mp-simulation-alternative').on('click', function() {
			var type = $(this).find('div[class=\'mp-alternative-show\']').attr('style-type');
			console.log('您选择了展示风格：' + type);
			colorSet('', type);
		});
	}

	//二维码
	var qrcode = function() {
		var windowUrlArray = window.location.href.split('/');
		var iframeUrl = $('#mp-iframe').attr('src');
		var url = windowUrlArray[0] + '//' + windowUrlArray[2] + iframeUrl;
		console.log('url' + url);
		jquery('#qrcode')
			.qrcode({
				width: 150,
				height: 150,
				correctLevel: 0,
				text: url
			});
	}

	styleSet();
	init();
	qrcode();
	return {
		refresh: function(isShow) {
			refresh(isShow);
		}
	}
})