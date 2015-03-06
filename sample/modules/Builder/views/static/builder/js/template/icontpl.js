define(function () {
	return {
		tpl:
			'<div class="navbg" id="navbg_<%=cid%>">'+
				'<p class="navtitle">菜单模块：<%=text%></p>'+
				'<div class="navbgcontainer">'+
					'<div class="mp-manage-imgupload  <% if (url) {%>mp-manage-imgupload-active<%}%>"  node-type="uploadcontainer">'+
						'<div class="uploadbg"></div>'+
						'<div class="privewbox">'+
							'<img  class="previewimg"  src="<%=url%>" node-type="previewimage" />'+
							'<span class="uploadbtn">'+
								'<span class="reuploadicon"></span><span class="reuploadiconlabel">重新上传</span>'+
							'</span>'+
						'</div>'+
					'</div>'+
				

					'<div class="mp-manage-uploadinfo">'+
						'建议尺寸720px*400px小于500k'+
						'<br>'+
						'你也可以 <a href="javascript:void(0)" class="defaultimg" node-type="defaultimg">使用默认图片</a>'+
					'</div>'+
					'<input type="file" style="display:none;" node-id="fileinput"/>'+

				'</div>'+
			'</div>'
	};
})