define(function(){
	return {
		tpl:'<div class="mp-manage-maplayer">'+
				'<div class="mp-manage-maplayer-address">'+
					'<label class="mp-manage-label">'+
						'<span class="require">*</span>店铺地址：'+
					'</label>'+

					'<div class="mp-manage-inputbox">'+
				        '<div class="address-control">'+
				            '<select class="mp-manage-maplayer-select" id="mp-manage-maplayer-province" data-name="province">'+
								'<option value="">省份</option>'+
							'</select>'+
							'<select class="mp-manage-maplayer-select" id="mp-manage-maplayer-city" data-name="city">'+
								'<option value="">城市</option>'+
							'</select>'+
							'<select class="mp-manage-maplayer-select" id="mp-manage-maplayer-regional" data-name="regional">'+
								'<option value="">区域</option>'+
							'</select>'+
				        '</div>'+
						'<span class="mp-manage-input-text">'+
							'<textarea id="mp-manage-maplayer-street" node-type="inputtext" data-name="street" class="textarea-control input textarea" type="textarea" placeholder="填写街道具体地址" style="width: 278px;height: 100px;margin-bottom: 25px;"></textarea>'+
							'<sup class="input-limit"><i node-type="inputnumber" class="input-number">0</i>/<b class="input-total">200</b></sup>'+
						'</span>'+
						'<span class="mark-control">'+
				            '<a href="javascript:;" class="mark-to-map"  id="mp-manage-maplayer-positionToMap">标注到地图</a>'+
							'<span class="tips-msg" id="mp-manage-maplayer-validate" >此项不能为空</span>'+
				        '</span>'+
				 	'</div>'+
				'</div>'+

				'<div id="mp-manage-maplayer-mapbox">'+
					'<div class="map-container" id="allmap"></div>'+
						'<div class="confirm-dialog-wrapper mp-manage-dialog-dis">'+
						    '<div class="confirm-dialog-bg"></div>'+
						    '<span class="title">您是否放弃当前位置，重新标记？</span>'+
						    '<span class="btn-area">'+
						        '<button class="btn btn-common btn-grey btn-remark">是</button>'+
						        '<button class="btn btn-common btn-grey btn-unremark">否</button>'+
						    '</span>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
	}
})