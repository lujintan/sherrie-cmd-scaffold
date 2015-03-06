## 使用手册 & 说明文档

开发准备篇
	环境需求
		1.php环境
		2.node环境
		3.jre版本：>= v1.5.0 		【本地调试服务器，可选】
		4.php-cgi版本：>= v5.0.0 【本地调试服务器，可选】
		5.fisp & fis-parser-sass
		6.fsmonitor
	环境搭建(默认你已安装node & php环境)
		npm install -g fis-plus
		npm install -g fis-parser-sass
		npm install -g fsmonitor

开发目录结构篇
-app/
	-page/
	-static/
		－css/
			-app/    -----app目录是存放核心包（一般不轻易修改）
			-core/	 -----core目录存放工具，通用包（可以修改，但不存放业务）
		-js/
			-app/
			-core/
	-test/
	-widget/
		-cover-*/	 -----业务相关的组件代码，包含相应的js,tpl,scss,img/
			-*.js 	 
			-*.scss
			-*.tpl
			-img/
*.tpl篇：
	通过fis的编译，将开发目录所有的 *.tpl模板放到产出目录output/app/template/app下
	app/page/   ==>  output/app/template/app/page
	app/widget/ ==>  output/app/template/app/widget
	不合并打包，保留各page和widget目录原有的目录结构
app.css篇
	通过fis的编译，将开发目录下的
	app/static/css目录下的*.css & *.scss
	app/widget/目录里所有的*.css & *.scss
	统一合并生成 output/app/static/app/app.css
	备注：采用fis的fis-parser-sass 插件对sass进行编译
	sass 入门教程：http://www.w3cplus.com/sassguide/
app.js篇
	通过fis的编译，将开发目录下的
	static/js/*.js
	widget目录里所有*.js
	统一合并生成 output/app/static/app/app.js


产出目录结构篇
output/
	-app/
		-static/
			-app/
				-app.js
				-app.css
		-template/
			-app/
				-page/
				-widget/


番外篇
	以上所有目录结构均为建议的目录结构，可以根据具体情况进行修改
	以app模块为例，如需修改目录结构，请修改views/app/fis-conf.js

	下方代码片段控制打包合并，如有修改，请同时更新相应的代码片段（每个模块都有）
	fis.config.merge({
	    namespace: 'app',
	    pack: {
	    	//合并为app.js
	        '/static/app.js': [
	            /\/static\/js\/core\/\w*.js/,
	            /\/static\/js\/app\/\w*.js/,
	            /\/static\/js\/\w*.js/,
	            /\/widget\/[\w\W]+\/\w*.js/
	        ],
	        //合并为app.css
	        '/static/app.css': [
	            /\/widget\/[\w\W]+\/\w*.(?:scss|css)/,
	            /\/static\/css\/app\/\w*.(?:scss|css)/
	        ]
	    }
	});
