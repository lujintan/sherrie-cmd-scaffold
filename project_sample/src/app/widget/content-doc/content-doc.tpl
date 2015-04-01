<div class="content-doc container">
  <div class="row doc-details">
    <div class="col-md-9">
      <h2 id="环境需求">环境需求</h2>
      <ul>
      <li><a href="http://nodejs.org">Node</a>环境</li>
      <li>jre版本：&gt;= v1.5.0       【本地调试服务器，可选】</li>
      <li>php-cgi版本：&gt;= v5.0.0 【本地调试服务器，可选】</li>
      <li>fisp &amp; fis-parser-sass</li>
      </ul>



      <h2 id="下载">下载</h2>

      <ul>
      <li>提供了两种方式进行下载</li>
      <li><p>使用git进行下载  </p>

      <blockquote>
        <p>git clone <a href="http://gitlab.baidu.com/liuhao18/rosetta-web.git">http://gitlab.baidu.com/liuhao18/rosetta-web.git</a></p>
      </blockquote></li>
      <li><p>直接下载包 </p>

      <blockquote>
        <p><a href="http://gitlab.baidu.com/liuhao18/rosetta-web/repository/archive.zip">点击下载</a></p>
      </blockquote></li>
      </ul>



      <h2 id="开始">开始</h2>

      <ul>
      <li>进入工程目录 cd rosetta-web</li>
      <li>安装环境依赖 sh base.sh</li>
      <li>启动测试服务器并编译 sh build.sh ( -stop 停止运行)</li>
      </ul>



      <h2 id="开发目录">开发目录</h2>



      <pre class="prettyprint"><code class=" hljs haml">-<span class="ruby">app/  
      </span>    -<span class="ruby">page/  
      </span>    -<span class="ruby">static/  
      </span>        －css/  
                  -<span class="ruby">app/    --app目录是存放核心包（一般不轻易修改）
      </span>            -<span class="ruby">core/   --core目录存放工具，通用包（可以修改，但不存放业务）
      </span>        -<span class="ruby">js/
      </span>            -<span class="ruby">app/
      </span>            -<span class="ruby">core/
      </span>    -<span class="ruby">test/
      </span>    -<span class="ruby">widget/
      </span>        -<span class="ruby">a/  --业务相关的组件代码，包含相应的js,tpl,scss,img/
      </span>            -<span class="ruby">a.js    
      </span>            -<span class="ruby">a.scss
      </span>            -<span class="ruby">a.tpl
      </span>            -<span class="ruby">img/</span></code></pre>



      <h2 id="接口api">接口API</h2>



      <h3 id="总览">总览</h3>

      <ul>
      <li>require：模块化开发</li>
      <li>appPage：页面管理、数据缓存</li>
      <li>Component：组件定义和组件化开发</li>
      <li>Invoke：组件初始化管理</li>
      <li>LocalStorage：本地存储管理</li>
      <li>to be continue。。。</li>
      </ul>



      <h3 id="页面管理">页面管理</h3>

      <p>模块化开发：</p>

      <blockquote>
        <ul>
        <li>同步预加载的用require(XXX)</li>
        <li>异步加载的用require.async(XXX, callback)</li>
        </ul>
      </blockquote>

      <p>初始化局部刷新：</p>



      <pre class="prettyprint"><code class=" hljs javascript">Rosetta.appPage.start({
          containerId: <span class="hljs-string">'pager'</span>,<span class="hljs-comment">//设置局刷id</span>
          pagelets: <span class="hljs-string">'pager'</span>,<span class="hljs-comment">//设置局刷id</span>
          validate: <span class="hljs-regexp">/^[\w\W]*\/\?/</span>,<span class="hljs-comment">//设置页面跳转的验证规则</span>
          cache: <span class="hljs-literal">true</span><span class="hljs-comment">//是否使用缓存</span>
      });</code></pre>

      <p>主动页面跳转</p>



      <pre class="prettyprint"><code class=" hljs lasso">Rosetta<span class="hljs-built_in">.</span>appPage<span class="hljs-built_in">.</span>redirect(url, {
          replace: <span class="hljs-literal">true</span>,
          containerId:<span class="hljs-string">'pre_load'</span>,<span class="hljs-comment">//跳转的dom的id</span>
          pagelets:<span class="hljs-string">'pre_load'</span>,
          target:<span class="hljs-string">''</span>,<span class="hljs-comment">//target是判定是否由页面点击跳转</span>
          forward: <span class="hljs-literal">false</span>,
          <span class="hljs-keyword">cache</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否使用缓存</span>
          lazyRender: <span class="hljs-literal">false</span>
      });</code></pre>

      <p>主动页面预取</p>



      <pre class="prettyprint"><code class=" hljs lasso">Rosetta<span class="hljs-built_in">.</span>appPage<span class="hljs-built_in">.</span>redirect(url, {
          replace: <span class="hljs-literal">false</span>,
          containerId:<span class="hljs-string">'pre_load'</span>,
          pagelets:<span class="hljs-string">'pre_load'</span>,
          target:<span class="hljs-string">''</span>,
          forward: <span class="hljs-literal">false</span>,
          <span class="hljs-keyword">cache</span>: <span class="hljs-literal">true</span>,
          lazyRender: <span class="hljs-literal">true</span>
      });</code></pre>

      <p>页面更新事件，便于基于此进行页面切换动画 <br>
      据刷的新页面开始渲染</p>



      <pre class="prettyprint"><code class=" hljs matlab"><span class="hljs-transposed_variable">Rosetta.</span><span class="hljs-transposed_variable">appPage.</span>on(<span class="hljs-string">'onpagerenderstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
          <span class="hljs-transposed_variable">console.</span><span class="hljs-built_in">log</span>(<span class="hljs-string">'begin render'</span>);
      })</code></pre>

      <p>据刷的页面渲染完成</p>



      <pre class="prettyprint"><code class=" hljs matlab"><span class="hljs-transposed_variable">Rosetta.</span><span class="hljs-transposed_variable">appPage.</span>on(<span class="hljs-string">'onpagerendercomplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
          <span class="hljs-transposed_variable">console.</span><span class="hljs-built_in">log</span>(<span class="hljs-string">'render done'</span>);
      })</code></pre>



      <h2 id="如何开发">如何开发</h2>

      <ul>
      <li><h3 id="认识common模块">认识common模块</h3>

      <p>common模块提供了一切架子的基础 <br>
      static目录</p>

      <blockquote>
        <p>存放一些静态资源包括核心包rosetta zepto lodash fastclick等js包，以及main.scss的核心css包（待完善）</p>
      </blockquote>

      <p>plugin目录</p>

      <blockquote>
        <p>提供了smarty的插件支持，编译完成后会存放在编译的根目录，配置smarty时需要引用plugin目录</p>
      </blockquote>

      <p>widget目录</p>

      <blockquote>
        <p>目前提供了loading组件，这个目录存放一些非常通用的组件，业务相关的通用组件请存放到app模块下 <br>
            page/layout.tpl是暴露给其他业务模块继承使用的基础模板，可以根据需要进行调整，里面包含了各种站位“坑”，如css，js以及目前可能用到加入的 “page”局刷页,”pre_load”预取页</p>
      </blockquote>

      <p>总的来说，common提供了一些最基础的内容，当前仅凭common是无法完成业务开发的，于是就有了app模块</p></li>
      <li><h3 id="认识app模块">认识app模块</h3>

      <p>app模块提供了业务相关的架子基础 <br>
      page目录</p>

      <blockquote>
        <p>base.tpl 继承common模块的layout.tpl，给其他page提供基础</p>
      </blockquote>

      <p>static目录</p>

      <blockquote>
        <p>提供了业务的静态资源，主要功能实现在js目录下 <br>
                    app.js 是该业务模块的核心基础，提供了事件绑定，事件监听等page的核心逻辑（页面初始化，预取等） <br>
                    utils.js提供了工具支持 <br>
                    init.js 用来执行以上两个js，保证初始化调用</p>
      </blockquote>

      <p>widget目录</p>

      <blockquote>
        <p>该业务组件级别的目录 <br>
                widget1 <br>
                    -widget1.scss <br>
                    -widget1.js <br>
                    -widget1.tpl</p>
      </blockquote></li>
      <li><h3 id="使用局刷页">使用局刷页</h3>

      <p>在app/page目录下添加1个页面page1.tpl，block的name=main提供了局刷的基础，它包裹的组件widget1会自动填充到页面的”#pager”里，这个时候只需要控制路由的跳转，该系统就会自动形成局刷效果展示在页面中</p>

      <pre class="prettyprint"><code class=" hljs mel">{<span class="hljs-variable">%extends</span> <span class="hljs-keyword">file</span>=<span class="hljs-string">"./base.tpl"</span><span class="hljs-variable">%}</span>  
      {<span class="hljs-variable">%block</span> name=<span class="hljs-string">"main"</span><span class="hljs-variable">%}</span>  
          {<span class="hljs-variable">%widget</span> name=<span class="hljs-string">"app:widget/widget1/widget1.tpl"</span> pagelet_id=<span class="hljs-string">"pagelet_detail"</span><span class="hljs-variable">%}</span>  
      {<span class="hljs-variable">%/</span>block<span class="hljs-variable">%}</span>  </code></pre></li>
      <li><h3 id="使用预取页">使用预取页</h3>

      <p>在app/page目录下添加1个页面page2.tpl，block name=pre_main会自动去填坑，其包裹的组件会自动填充到页面”#pre_load”里，然后再需要添加的里加上属性data-area=pre_load，那么在页面初始化时就会预先去发起请求获取到该路由下的页面并保存到本地，下次再访问预取的页面时就不会再发请求了</p>

      <pre class="prettyprint"><code class=" hljs mel">{<span class="hljs-variable">%extends</span> <span class="hljs-keyword">file</span>=<span class="hljs-string">"./base.tpl"</span><span class="hljs-variable">%}</span>  
      {<span class="hljs-variable">%block</span> name=<span class="hljs-string">"pre_main"</span><span class="hljs-variable">%}</span>  
          {<span class="hljs-variable">%widget</span> name=<span class="hljs-string">"app:widget/widget1/widget1.tpl"</span> pagelet_id=<span class="hljs-string">"pagelet_detail"</span><span class="hljs-variable">%}</span>  
      {<span class="hljs-variable">%/</span>block<span class="hljs-variable">%}</span>  </code></pre></li>
      <li><h3 id="组件">组件</h3>

      <p>核心思想：泛化组件概念，任何逻辑、UI独立的功能看做成一个组件 <br>
      要素：</p>

      <ol><li>模块化开发</li>
      <li>基本组件由html、js、css组成</li>
      <li>不可见组件可以只有js没有html、css</li>
      <li>初始化管理，防止一个页面内多个同类组件重复初始化导致比如事件重复绑定的问题等</li></ol>

      <h4 id="组件的初始化">组件的初始化</h4>

      <p>以组件a为例：创建app/widget/a目录及a.tpl, a.scss, a.js</p>

      <h4 id="atpl">a.tpl</h4>

      <pre class="prettyprint"><code class=" hljs actionscript">{<span></span>%require name=<span class="hljs-string">"app:widget/a/a.scss"</span>%}

      &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">a</span>-<span class="hljs-title">test</span>"&gt;
          &lt;<span class="hljs-title">div</span>&gt;
              &lt;<span class="hljs-title">h1</span>&gt;<span class="hljs-title">Start</span>&lt;/<span class="hljs-title">h1</span>&gt;
              &lt;<span class="hljs-title">p</span>&gt;简要介绍<span class="hljs-title">Rosetta</span>,以及如何下载、使用等等&lt;/<span class="hljs-title">p</span>&gt;
          &lt;/<span class="hljs-title">div</span>&gt;
      &lt;/<span class="hljs-title">div</span>&gt;

      {</span>%script%}
          Rosetta.invoke(<span class="hljs-string">'a'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
              <span class="hljs-keyword">var</span> a = require(<span class="hljs-string">'app:widget/a/a.js'</span>);
              <span class="hljs-keyword">new</span> a(<span class="hljs-keyword">this</span>.container);
          })
      {<span></span>%/script%}</code></pre>

      <h4 id="ajs">a.js</h4>

      <pre class="prettyprint"><code class=" hljs javascript"><span class="hljs-keyword">var</span> option = {
          init: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>

          },
          events: {
              <span class="hljs-string">'selector eventType'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
                  console.log(<span class="hljs-number">111</span>);
              }
          }
      };
      module.exports = Rosetta.Component(option);</code></pre>

      <h4 id="ascss">a.scss</h4>

      <pre class="prettyprint"><code class=" hljs css"><span class="hljs-class">.a-test</span> <span class="hljs-rules">{
          <span class="hljs-rule"><span class="hljs-attribute">background</span>:<span class="hljs-value"> gray</span></span>;
      <span class="hljs-rule">}</span></span></code></pre>

      <p>组件里如何实现局刷跳转？</p>

      <pre class="prettyprint"><code class=" hljs xml"><span class="hljs-tag">&lt;<span class="hljs-title">a</span> <span class="hljs-attribute">href</span>=<span class="hljs-value">"/app/page/page2?"</span>&gt;</span>link<span class="hljs-tag">&lt;/<span class="hljs-title">a</span>&gt;</span></code></pre>

      <p>如何使需要跳转的页面预先加载？</p>

      <pre class="prettyprint"><code class=" hljs lasso"><span class="hljs-subst">&lt;</span>a href<span class="hljs-subst">=</span><span class="hljs-string">"/app/page/page2?"</span> <span class="hljs-built_in">data</span><span class="hljs-attribute">-area</span><span class="hljs-subst">=</span><span class="hljs-string">"pre_load"</span><span class="hljs-subst">&gt;</span><span class="hljs-keyword">link</span><span class="hljs-subst">&lt;</span>/a<span class="hljs-subst">&gt;</span></code></pre>

      <p>特别的，如果需要使用原生的跳转页面则需要在初始化局部刷新中设置正则表达来过滤。（默认以http开始的使用页面跳转）</p></li>
      </ul>

      <h2 id="关于sass后缀名scss">关于sass(后缀名scss)</h2>

      <p>scss存在的位置：</p>



      <pre class="prettyprint"><code class=" hljs axapta"><span class="hljs-keyword">common</span>/<span class="hljs-keyword">static</span>/css/main.scss
      <span class="hljs-keyword">common</span>/widget<span class="hljs-comment">/*/*.scss
      app/static/css/app/page.scss
      app/static/css/core/_mixins.scss
      app/widget/*/</span>*.scss</code></pre>

      <p>common模块中存放的是最通用的scss，一般情况下不在里面添加代码 <br>
      app/static的core目录中存放的是通用scss，比如_mixins.scss,_consts.scss分别存放mixin和业务通用的常量 <br>
          app/static的app模块存放的是业务整体的样式表，比如滑动的动画，整体页面风格等 <br>
          widget目录下存放的是组件相关的样式，仅对当前widget有效</p>

      <pre><code>针对widget样式开发建议：
          对widget1.tpl，建议用&lt;div class="widget1"&gt;&lt;/div&gt;进行包裹
          对widget1.scss 以.widget {}进行包裹
          开发时发现通用的样式，业务相关则放入app下的page.scss，更加通用且业务无关可考虑放在common下的main.scss中
      </code></pre>



      <h2 id="原理">原理</h2>

      <pre><code>一般依赖smarty的开发需要写好模板配置路由则可完成页面的跳转,但每次跳转都要刷新页面。
      而我们在smarty的基础上使用了fisp插件plugin，在原有模板基础上只需要做一点小小的更改则可完美适配该插件。
      在配置smarty的时候加上以下四行代码,view/config指的是经过fisp编译的静态资源映射表,可修改成自己de路径, view是前端代码的根目录, plugins指向我们的fisp插件
      $this-&gt;smarty = Bd_TplFactory::getInstance();
      $this-&gt;smarty-&gt;addPluginsDir(dirname(__FILE__) . '/../plugins');
      $this-&gt;smarty-&gt;setConfigDir(dirname(__FILE__) . 'view/config/');
      $this-&gt;smarty-&gt;setTemplateDir(dirname(__FILE__) . 'view/');

      经过以上配置则服务端已开启quickling之路
      tips:如果遇到一些无法加载模板失败而又有点莫名其妙的error时，先验证下自己加载的插件及路径是否正确哦

      关于 block, widget 以及 widget_block
      来自layout.tpl (基础模板)
      </code></pre>



      <pre class="prettyprint"><code class=" hljs ruby">{<span></span>%widget_block pagelet_id=<span class="hljs-string">"pager"</span>%}
          {<span></span>%block name=<span class="hljs-string">"main"</span>%}{<span class="hljs-string">%/block%}
      {<span></span>%/</span>widget_block%}</code></pre>

      <p>来自base.tpl (业务模板)</p>



      <pre class="prettyprint"><code class=" hljs mel">{<span class="hljs-variable">%extends</span> <span class="hljs-keyword">file</span>=<span class="hljs-string">"common/page/layout.tpl"</span><span class="hljs-variable">%}</span></code></pre>

      <p>来自page.tpl (业务页面)</p>



      <pre class="prettyprint"><code class=" hljs mel">{<span class="hljs-variable">%extends</span> <span class="hljs-keyword">file</span>=<span class="hljs-string">"./base.tpl"</span><span class="hljs-variable">%}</span>
      {<span class="hljs-variable">%block</span> name=<span class="hljs-string">"main"</span><span class="hljs-variable">%}</span>
          {<span class="hljs-variable">%widget</span> name=<span class="hljs-string">"app:widget/widget1/widget1.tpl"</span> pagelet_id=<span class="hljs-string">"pagelet_detail"</span><span class="hljs-variable">%}</span>
      {<span class="hljs-variable">%/</span>block<span class="hljs-variable">%}</span></code></pre>

      <p>以上代码的功能：</p>

      <blockquote>
        <p>layout通过”widget_block”挖了一些”坑”,  <br>
        page通过”block”来填”坑”, widget用来引用组件</p>
      </blockquote>

      <p>经过这些模板和组件我们完成了基础的架子搭建</p>

      <pre><code>局刷原理
          每个路由都对应一个静态的tpl模板，
          如
              app/page/page -&gt; page.tpl
              app/page/page2-&gt; page2.tpl

          如果直接在地址栏输入相应地址则正常刷新该页面
          但如果是从page.tpl 跳转到page2.tpl
          如page.tpl里有&lt;a href="/
          app/page/page2"&gt;jump to page2&lt;/a&gt;
          1.通过common/static/js/lib/rosetta.js的事件代理，捕获到该链接，禁止默认的跳转
          2.然后调用rosetta.js的Bigpipe模块的fetch方法，在发起的ajax请求头部加入X-Requested-With:XMLHttpRequest参数
          3.fisp的plugin插件将根据config中的xx.json的资源映射表(之前配置plugin的时候有提过),定位到相应资源及所需依赖,然后把所有资源打包生成json（js依赖css依赖dom的ID以及html的字符串形式)
          4.rosetta.js在接收到json后通过renderPagelet方法把传回的html渲染到dom中
      预取原理
          预取原理同局刷原理,只是渲染回的id不同,一个是"pager",一个是"pre_load"
      </code></pre>



      <h2 id="编译">编译</h2>



      <h3 id="编译过程">编译过程</h3>

      <ul>
      <li>*.tpl <br>


      <blockquote>
        <p>默认不编译*.tpl文件，保留原有目录结构，发布到template目录下</p></blockquote></li>
        <li><p>app.css</p>


      <blockquote>
        <p>默认将app模块下的static目录及widget目录里所有的scss和css合并成static/app/app.css <br>
        对应的，将common模块的静态资源同样打包至static/common/base.css <br>
        备注：采用fis的fis-parser-sass 插件对sass进行编译 <br>
        sass 入门教程：<a href="http://www.w3cplus.com/sassguide/">http://www.w3cplus.com/sassguide/</a></p>
      </blockquote></li>
      <li><p>app.js</p>

      <blockquote>
        <p>默认将app模块下的static目录及widget目录里所有的js合并成static/app/app.js <br>
        对应的，将common模块的静态资源同样打包至static/common/base.js</p>
      </blockquote></li>
      </ul>



      <h3 id="编译后目录">编译后目录</h3>



      <pre class="prettyprint"><code class=" hljs haml">-<span class="ruby">config/
      </span>    -<span class="ruby"> app-map.json
      </span>    -<span class="ruby"> common-map.json
      </span>-<span class="ruby">plugin/
      </span>    -<span class="ruby"> fisp对smarty的封装
      </span>-<span class="ruby">static/
      </span>    -<span class="ruby">app/
      </span>        -<span class="ruby">app.js
      </span>        -<span class="ruby">app.css
      </span>    -<span class="ruby">common/
      </span>        -<span class="ruby">base.js
      </span>        -<span class="ruby">base.css
      </span>-<span class="ruby">template/
      </span>    -<span class="ruby">app/
      </span>        -<span class="ruby">保留tpl原有目录结构不打包不编译
      </span>    -<span class="ruby">common/
      </span>        -<span class="ruby">保留tpl原有目录结构不打包不编译</span></code></pre>



      <h3 id="fis-confjs的配置">fis-conf.js的配置</h3>

      <p>以上所有目录结构均为建议的目录结构，可以根据具体情况进行修改</p>

      <blockquote>
        <p>以app模块为例，如需修改目录结构，请修改views/app/fis-conf.js</p>
      </blockquote>

      <p>下方代码片段控制打包合并，如有修改，请同时更新相应的代码片段（每个模块都有）</p>



      <pre class="prettyprint"><code class=" hljs tex">fis.config.merge(<span class="hljs-special">{</span>
          namespace: 'app',
          pack: <span class="hljs-special">{</span>
              //合并为app.js
              '/static/app.js': <span class="hljs-special">[</span>
                  /<span class="hljs-command">\/</span>static<span class="hljs-command">\/</span>js<span class="hljs-command">\/</span>core<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.js/,
                  /<span class="hljs-command">\/</span>static<span class="hljs-command">\/</span>js<span class="hljs-command">\/</span>app<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.js/,
                  /<span class="hljs-command">\/</span>static<span class="hljs-command">\/</span>js<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.js/,
                  /<span class="hljs-command">\/</span>widget<span class="hljs-command">\/</span><span class="hljs-special">[</span><span class="hljs-command">\w</span><span class="hljs-command">\W</span><span class="hljs-special">]</span>+<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.js/
              <span class="hljs-special">]</span>,
              //合并为app.css
              '/static/app.css': <span class="hljs-special">[</span>
                  /<span class="hljs-command">\/</span>widget<span class="hljs-command">\/</span><span class="hljs-special">[</span><span class="hljs-command">\w</span><span class="hljs-command">\W</span><span class="hljs-special">]</span>+<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.(?:scss|css)/,
                  /<span class="hljs-command">\/</span>static<span class="hljs-command">\/</span>css<span class="hljs-command">\/</span>app<span class="hljs-command">\/</span><span class="hljs-command">\w*</span>.(?:scss|css)/
              <span class="hljs-special">]</span>
          <span class="hljs-special">}</span>
      <span class="hljs-special">}</span>);</code></pre>

      <p>下方代码控制fisp调用fis-parse-sass插件进行编译*.scss（每个模块都有）, 将scss编译成css</p>



      <pre class="prettyprint"><code class=" hljs sql">fis.config.<span class="hljs-operator"><span class="hljs-keyword">set</span>(<span class="hljs-string">'modules.parser.scss'</span>, <span class="hljs-string">'sass'</span>);</span>
      fis.config.<span class="hljs-operator"><span class="hljs-keyword">set</span>(<span class="hljs-string">'roadmap.ext.scss'</span>, <span class="hljs-string">'css'</span>);</span></code></pre>

      <p>在业务模块app下特有的编译，取消init.js的mod化，否则无法正常使用</p>



      <pre class="prettyprint"><code class=" hljs tex">fis.config.get('roadmap.path').unshift(<span class="hljs-special">{</span>
          reg: /<span class="hljs-command">\/</span>static<span class="hljs-command">\/</span>js<span class="hljs-command">\/</span>app<span class="hljs-command">\/</span>(?!.*<span class="hljs-special">[</span>init<span class="hljs-special">]</span><span class="hljs-command">\.</span>js<span class="hljs-formula">$)<span class="hljs-special">[</span><span class="hljs-command">\s</span><span class="hljs-command">\S</span><span class="hljs-special">]</span>+/,
          isMod: true
      <span class="hljs-special">}</span>);</span></code></pre>
    </div>
    <div class="col-md-3">
      <link rel="stylesheet" href="http://yandex.st/highlightjs/6.2/styles/googlecode.min.css">
      <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
      <script src="http://yandex.st/highlightjs/6.2/highlight.min.js"></script>
     
      <script>hljs.initHighlightingOnLoad();</script>
      <script type="text/javascript">
       $(document).ready(function(){
            $("h2,h3,h4,h5,h6").each(function(i,item){
              var tag = $(item).get(0).localName;
              $(item).attr("id","wow"+i);
              $("#category").append('<a class="new'+tag+'" href="#wow'+i+'">'+$(this).text()+'</a></br>');
              $(".newh2").css("margin-left",0);
              $(".newh3").css("margin-left",20);
              $(".newh4").css("margin-left",40);
              $(".newh5").css("margin-left",60);
              $(".newh6").css("margin-left",80);
            });
       });
      </script>
      <div id="category"></div>
    </div>
  </div>
</div>

{%script%}
    Rosetta.invoke('content-doc', function() {
        var contentDoc = require('app:widget/content-doc/content-doc.js');
        new contentDoc(this.container);
    })
{%/script%}