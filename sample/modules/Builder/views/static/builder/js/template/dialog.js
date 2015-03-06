define(function(){
	return {
		tpl:'<div class="mp-manage-dialog" node-type="dialogContainer">'+
				'<span class="mp-manage-dialog-close" node-type="close">关闭</span>'+
				'<p class="mp-manage-dialog-title" node-type="title"><%=title%></p>'+
				'<div class="mp-manage-dialog-container" node-type="content">'+
					
				'</div>'+
				'<div class="mp-manage-dialog-buttonbox">' +
					'<button class="mp-manage-btn mp-manage-btn-blue" nodetype="okbutton" type="submit">确定</button>' +
					'<a class="mp-manage-btn" nodetype="cancelbutton">取消</a>' +
				'</div>'+
			'</div>'+
			'<div class="mp-manage-dialog-mask" node-type="mask"></div>'
	}
})