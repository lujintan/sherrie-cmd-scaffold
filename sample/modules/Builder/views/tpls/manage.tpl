<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>景区门票模板</title>
        <link rel="stylesheet" type="text/css" href="/static/builder/css/common.css">
        <link rel="stylesheet" type="text/css" href="/static/builder/css/lib/cropper.css">
        <link rel="stylesheet" type="text/css" href="/static/builder/css/manage.css">
        <script type="text/javascript">
        	var require = {
        		baseUrl: '/static/builder/js',
        		paths: {
        			lightapp:"http://apps.bdimg.com/developer/static/2/assets/appbuilder/lightapp_builder.min",
        			jquery: 'http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min',
        			underscore: 'http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min',
        			backbone: 'http://apps.bdimg.com/libs/backbone.js/1.1.2/backbone-min',
        		},
        		shim: {
        			jquery: {
        				exports: '$',
        			},
        			underscore: {
        				exports: '_',
        			},
        			backbone: {
        				deps: ['underscore', 'jquery'],
        				exports: 'Backbone'
        			},
        			app: {
        				deps: ['backbone'],
        			}
        		},
        		map: {
                    '*': 'FIS_MAP_JSON',
                }
        	};
		</script>
	   	<script type="text/javascript" src="http://apps.bdimg.com/libs/require.js/2.1.9/require.min.js"></script>
	   	<script type="text/javascript" src="/static/builder/js/page/manage.js"></script>
    </head>
    <body>

		{%include file="tpls/bar.tpl"%}
		<div id="mp-manage-container" class="mp-manage-container">
				
			<div class="mp-manage-simulation">
				{%include file="tpls/simulation.tpl"%}
			</div> 

			<div class="mp-manage-managebox">
				<ul class="mp-manage-moduleitem" id="mp-manage-manageTab">
					<li class="active mp-manage-tips" data-module="cover">封面</li>
					<li data-module="introduce">景区介绍</li>
					<li data-module="tickets">景区门票</li>
					<li data-module="gallery">景区图片</li>
					<li data-module="routes">景区路线</li>
					<li data-module="tourguide">景区导览</li>
					 
					<li class="" data-module="spotlist">热门景点</li>
					<li class="" data-module="heatmap">景区热力图</li>
					<li class="" data-module="weather">景区天气</li>
					
				</ul>

				<div class="mp-manage-moduleitem mp-manage-ticketsbar" id="mp-manage-ticketsbar">
					<span class="mp-manage-back" node-type="goback"></span>
					<span class="ticket_label" node-type="goback">景区门票 > </span>
					<span class="ticket_info">添加内容</span>
				</div>

				<div class="mp-manage-modulebox" id="mp-manage-moduleList">
					<div class="mp-manage-module mp-manage-cover" module="cover">
						{%include file="tpls/selectmodule.tpl"%}
						{%include file="tpls/imgupload.tpl"%}
						<button class="mp-manage-savebutton" node-type="submit">保存并预览</button>
					</div>
					<div class="mp-manage-module" module="introduce">{%include file="tpls/introduce.tpl"%}</div>
					<div class="mp-manage-module" module="tickets">{%include file="tpls/tickets.tpl"%}</div>
					<div class="mp-manage-module" module="spotlist">{%include file="tpls/spotlist.tpl"%}</div>
					<div class="mp-manage-module" module="gallery">{%include file="tpls/gallery.tpl"%}</div>
					<div class="mp-manage-module" module="weather">{%include file="tpls/weather.tpl"%}</div>
					<div class="mp-manage-module" module="routes">{%include file="tpls/routes.tpl"%}</div>
					<div class="mp-manage-module" module="tourguide">{%include file="tpls/tourguide.tpl"%}</div>
					<div class="mp-manage-module" module="heatmap">{%include file="tpls/heatmap.tpl"%}</div>
				</div>
			</div>

		</div>


    </body>
</html>