##环境需求
- [Node](http://nodejs.org)环境
- jre版本：>= v1.5.0 		【本地调试服务器，可选】
- php-cgi版本：>= v5.0.0 【本地调试服务器，可选】
- fisp & fis-parser-sass


##下载
- 提供了两种方式进行下载
- 使用git进行下载  
> git clone http://gitlab.baidu.com/liuhao18/rosetta-web.git

- 直接下载包 
> [点击下载](http://gitlab.baidu.com/liuhao18/rosetta-web/repository/archive.zip)

##开始
- 进入工程目录 cd rosetta-web
- 安装环境依赖 sh base.sh
- 启动测试服务器并编译 sh build.sh ( -stop 停止运行)

##开发目录

```
-app/  
	-page/  
	-static/  
		－css/  
			-app/    --app目录是存放核心包（一般不轻易修改）
			-core/	 --core目录存放工具，通用包（可以修改，但不存放业务）
		-js/
			-app/
			-core/
	-test/
	-widget/
		-a/	 --业务相关的组件代码，包含相应的js,tpl,scss,img/
			-a.js 	 
			-a.scss
			-a.tpl
			-img/
```
## 接口API
### 总览
+ require：模块化开发
+ appPage：页面管理、数据缓存
+ Component：组件定义和组件化开发
+ Invoke：组件初始化管理
+ LocalStorage：本地存储管理
+ to be continue。。。

### 页面管理
模块化开发：
>- 同步预加载的用require(XXX)
>- 异步加载的用require.async(XXX, callback)


初始化局部刷新：
```
Rosetta.appPage.start({
    containerId: 'pager',//设置局刷id
    pagelets: 'pager',//设置局刷id
    validate: /^[\w\W]*\/\?/,//设置页面跳转的验证规则
    cache: true//是否使用缓存
});
```
主动页面跳转
```
Rosetta.appPage.redirect(url, {
    replace: true,
    containerId:'pre_load',//跳转的dom的id
    pagelets:'pre_load',
    target:'',//target是判定是否由页面点击跳转
    forward: false,
    cache: true,//是否使用缓存
    lazyRender: false
});
```
主动页面预取
```
Rosetta.appPage.redirect(url, {
    replace: false,
    containerId:'pre_load',
    pagelets:'pre_load',
    target:'',
    forward: false,
    cache: true,
    lazyRender: true
});
```
页面更新事件，便于基于此进行页面切换动画
据刷的新页面开始渲染
```
Rosetta.appPage.on('onpagerenderstart', function(e) {
    console.log('begin render');
})
```
据刷的页面渲染完成
```
Rosetta.appPage.on('onpagerendercomplete', function(e) {
    console.log('render done');
})
```
##如何开发
- ###认识common模块
	common模块提供了一切架子的基础
	static目录
			>存放一些静态资源包括核心包rosetta zepto lodash fastclick等js包，以及main.scss的核心css包（待完善）
		
	plugin目录
			>提供了smarty的插件支持，编译完成后会存放在编译的根目录，配置smarty时需要引用plugin目录
		
	widget目录
			>目前提供了loading组件，这个目录存放一些非常通用的组件，业务相关的通用组件请存放到app模块下
		page/layout.tpl是暴露给其他业务模块继承使用的基础模板，可以根据需要进行调整，里面包含了各种站位“坑”，如css，js以及目前可能用到加入的 "page"局刷页,"pre_load"预取页
	
	总的来说，common提供了一些最基础的内容，当前仅凭common是无法完成业务开发的，于是就有了app模块


- ###认识app模块
	app模块提供了业务相关的架子基础
	page目录
			>base.tpl 继承common模块的layout.tpl，给其他page提供基础
			
	static目录
			>提供了业务的静态资源，主要功能实现在js目录下
				app.js 是该业务模块的核心基础，提供了事件绑定，事件监听等page的核心逻辑（页面初始化，预取等）
				utils.js提供了工具支持
				init.js 用来执行以上两个js，保证初始化调用

	widget目录
			>该业务组件级别的目录
			widget1
				-widget1.scss
				-widget1.js
				-widget1.tpl


- ###使用局刷页
在app/page目录下添加1个页面page1.tpl，block的name=main提供了局刷的基础，它包裹的组件widget1会自动填充到页面的"#pager"里，这个时候只需要控制路由的跳转，该系统就会自动形成局刷效果展示在页面中
	```
	{%extends file="./base.tpl"%}  
	{%block name="main"%}  
		{%widget name="app:widget/widget1/widget1.tpl" pagelet_id="pagelet_detail"%}  
	{%/block%}  
	```


- ###使用预取页
	
	在app/page目录下添加1个页面page2.tpl，block name=pre_main会自动去填坑，其包裹的组件会自动填充到页面"#pre_load"里，然后再需要添加的里加上属性data-area=pre_load，那么在页面初始化时就会预先去发起请求获取到该路由下的页面并保存到本地，下次再访问预取的页面时就不会再发请求了
	```
	{%extends file="./base.tpl"%}  
	{%block name="pre_main"%}  
		{%widget name="app:widget/widget1/widget1.tpl" pagelet_id="pagelet_detail"%}  
	{%/block%}  
	```



- ###组件
	
	核心思想：泛化组件概念，任何逻辑、UI独立的功能看做成一个组件
	要素：
	1. 模块化开发
	2. 基本组件由html、js、css组成
	3. 不可见组件可以只有js没有html、css
	4. 初始化管理，防止一个页面内多个同类组件重复初始化导致比如事件重复绑定的问题等

	
	####组件的初始化
	以组件a为例：创建app/widget/a目录及a.tpl, a.scss, a.js

	####a.tpl
	```
	{%require name="app:widget/a/a.scss"%}
	
	<div class="a-test">
	  	<div>
	    	<h1>Start</h1>
	    	<p>简要介绍Rosetta,以及如何下载、使用等等</p>
	  	</div>
	</div>
	
	{%script%}
	    Rosetta.invoke('a', function() {
	        var a = require('app:widget/a/a.js');
	        new a(this.container);
	    })
	{%/script%}
	```

	####a.js
	```
	var option = {
	    init: function () {
	
	    },
	    events: {
	        'selector eventType': function() {
	            console.log(111);
	        }
	    }
	};
	module.exports = Rosetta.Component(option);
	```
	####a.scss
	```
	.a-test {
		background: gray;
	}
	```
组件里如何实现局刷跳转？
	```
	<a href="/app/page/page2?">link</a>
	```
如何使需要跳转的页面预先加载？
	```
	<a href="/app/page/page2?" data-area="pre_load">link</a>
	```
特别的，如果需要使用原生的跳转页面则需要在初始化局部刷新中设置正则表达来过滤。（默认以http开始的使用页面跳转）
##关于sass(后缀名scss)
	
scss存在的位置：
```
common/static/css/main.scss
common/widget/*/*.scss
app/static/css/app/page.scss
app/static/css/core/_mixins.scss
app/widget/*/*.scss
```
common模块中存放的是最通用的scss，一般情况下不在里面添加代码
app/static的core目录中存放的是通用scss，比如_mixins.scss,_consts.scss分别存放mixin和业务通用的常量
	app/static的app模块存放的是业务整体的样式表，比如滑动的动画，整体页面风格等
	widget目录下存放的是组件相关的样式，仅对当前widget有效

	针对widget样式开发建议：
		对widget1.tpl，建议用<div class="widget1"></div>进行包裹
		对widget1.scss 以.widget {}进行包裹
		开发时发现通用的样式，业务相关则放入app下的page.scss，更加通用且业务无关可考虑放在common下的main.scss中

##原理
	一般依赖smarty的开发需要写好模板配置路由则可完成页面的跳转,但每次跳转都要刷新页面。
	而我们在smarty的基础上使用了fisp插件plugin，在原有模板基础上只需要做一点小小的更改则可完美适配该插件。
	在配置smarty的时候加上以下四行代码,view/config指的是经过fisp编译的静态资源映射表,可修改成自己de路径, view是前端代码的根目录, plugins指向我们的fisp插件
	$this->smarty = Bd_TplFactory::getInstance();
    $this->smarty->addPluginsDir(dirname(__FILE__) . '/../plugins');
    $this->smarty->setConfigDir(dirname(__FILE__) . 'view/config/');
    $this->smarty->setTemplateDir(dirname(__FILE__) . 'view/');
	
	经过以上配置则服务端已开启quickling之路
	tips:如果遇到一些无法加载模板失败而又有点莫名其妙的error时，先验证下自己加载的插件及路径是否正确哦

	关于 block, widget 以及 widget_block
	来自layout.tpl (基础模板)
```
{%widget_block pagelet_id="pager"%}
	{%block name="main"%}{%/block%}
{%/widget_block%}
```
来自base.tpl (业务模板)
```
{%extends file="common/page/layout.tpl"%}
```   
来自page.tpl (业务页面)
```
{%extends file="./base.tpl"%}
{%block name="main"%}
	{%widget name="app:widget/widget1/widget1.tpl" pagelet_id="pagelet_detail"%}
{%/block%}
```
以上代码的功能：
>layout通过"widget_block"挖了一些"坑", 
>page通过"block"来填"坑", widget用来引用组件
    
经过这些模板和组件我们完成了基础的架子搭建

    局刷原理
    	每个路由都对应一个静态的tpl模板，
    	如
    		app/page/page -> page.tpl
    		app/page/page2-> page2.tpl

    	如果直接在地址栏输入相应地址则正常刷新该页面
    	但如果是从page.tpl 跳转到page2.tpl
    	如page.tpl里有<a href="/
    	app/page/page2">jump to page2</a>
    	1.通过common/static/js/lib/rosetta.js的事件代理，捕获到该链接，禁止默认的跳转
    	2.然后调用rosetta.js的Bigpipe模块的fetch方法，在发起的ajax请求头部加入X-Requested-With:XMLHttpRequest参数
    	3.fisp的plugin插件将根据config中的xx.json的资源映射表(之前配置plugin的时候有提过),定位到相应资源及所需依赖,然后把所有资源打包生成json（js依赖css依赖dom的ID以及html的字符串形式)
    	4.rosetta.js在接收到json后通过renderPagelet方法把传回的html渲染到dom中
    预取原理
    	预取原理同局刷原理,只是渲染回的id不同,一个是"pager",一个是"pre_load"




##编译
###编译过程
- *.tpl
	>默认不编译*.tpl文件，保留原有目录结构，发布到template目录下
- app.css
	>默认将app模块下的static目录及widget目录里所有的scss和css合并成static/app/app.css
	对应的，将common模块的静态资源同样打包至static/common/base.css
	备注：采用fis的fis-parser-sass 插件对sass进行编译
	sass 入门教程：<http://www.w3cplus.com/sassguide/>

- app.js
	>默认将app模块下的static目录及widget目录里所有的js合并成static/app/app.js
	对应的，将common模块的静态资源同样打包至static/common/base.js

###编译后目录
```
-config/
	- app-map.json
	- common-map.json
-plugin/
	- fisp对smarty的封装
-static/
	-app/
		-app.js
		-app.css
	-common/
		-base.js
		-base.css
-template/
	-app/
		-保留tpl原有目录结构不打包不编译
	-common/
		-保留tpl原有目录结构不打包不编译
```


###fis-conf.js的配置(编译配置)

以上所有目录结构均为建议的目录结构，可以根据具体情况进行修改
>以app模块为例，如需修改目录结构，请修改views/app/fis-conf.js

下方代码片段控制打包合并，如有修改，请同时更新相应的代码片段（每个模块都有）
```
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
```
下方代码控制fisp调用fis-parse-sass插件进行编译*.scss（每个模块都有）, 将scss编译成css
```
fis.config.set('modules.parser.scss', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
```
在业务模块app下特有的编译，取消init.js的mod化，否则无法正常使用
```
fis.config.get('roadmap.path').unshift({
    reg: /\/static\/js\/app\/(?!.*[init]\.js$)[\s\S]+/,
    isMod: true
});
```