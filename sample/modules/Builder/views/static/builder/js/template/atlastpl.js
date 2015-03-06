define(function(){
	return {
		atlas:'<li class="atlasbox <%=classname%>" id="cid_<%=obj.cid%>">'+
				'<span class="atlasName"><%=obj.name%></span>'+
				'<span class="atlasoption">'+
					'<a href="javascript:void(0)" class="editbutton" node-type="atlasEdit" data-cid="<%=obj.cid%>"></a>'+
					'<a href="javascript:void(0)" class="deletebutton" node-type="atlasDelete" data-cid="<%=obj.cid%>"></a>'+
				'</span>'+
			'</li>',
		image:
			'<div class="mp-manage-uploadimgbox ">'+
				'<div class="imgbox"><img src="<%=url%>"><span class="deletebtn" node-type="deleteImg"></span></div>'+
				
				'<div class="mp-manage-inputbox imgtitle">'+
					'<span class="mp-manage-input-text">'+
						'<input style="width:137px;margin-right:32px;" node-type="inputtext" maxlength="20" node-type="image" placeholder="请输入图片名称" data-url="<%=url%>" type="text" class="input mp-manage-input imgtitleinput" value="<%=title%>" />'+
						'<sup class="input-limit"><i node-type="inputnumber" class="input input-number">0</i>/<b class="input-total">10</b></sup>'+
					'</span>'+	
				'</div>	'+

			'</div>'
	}
})