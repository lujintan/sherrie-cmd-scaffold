<div class="content-start container">
<h1 id="sherrie">sherrie</h1>



<h2 id="环境依赖">环境依赖</h2>

<ul>
<li>确保你已安装了<a href="http://nodejs.org">Node</a></li>
<li>确保你已安装了php (快速安装推荐<a href="http://www.wampserver.com/en/">wamp</a>和<a href="https://www.apachefriends.org/index.html">xampp</a>)</li>
</ul>



<h2 id="安装">安装</h2>



<pre class="prettyprint"><code class="language-bash hljs ">npm install -g sherrie</code></pre>



<h2 id="快速开始">快速开始</h2>



<h5 id="第一步创建项目">第一步，创建项目</h5>



<pre class="prettyprint"><code class="language-bash hljs ">she install</code></pre>

<p>需要按照提示输入：</p>

<ul>
<li>project name(项目名)</li>
<li>FID(Fis 自动打包功能对应的产品线id，直接输入Enter表示不使用自动打包功能)</li>
<li>author(作者)</li>
</ul>



<h4 id="第二步启动本地服务器">第二步，启动本地服务器</h4>



<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment">#启动服务器</span>
she server start
<span class="hljs-comment">#初始化服务器框架</span>
she server init</code></pre>



<h4 id="第三步发布本地测试代码">第三步，发布本地测试代码</h4>



<pre class="prettyprint"><code class="language-bash hljs ">she releaseall</code></pre>



<h4 id="第四步预览效果">第四步，预览效果</h4>

<p><a href="http://127.0.0.1:8080/app/page/home">http://127.0.0.1:8080/app/page/home</p>



<h2 id="命令列表">命令列表</h2>



<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment">#查阅命令</span>
she --help
<span class="hljs-comment">#查阅命令配置项</span>
she &lt;command&gt; --help</code></pre>

<ul>
<li>install 创建项目，详细：she install –help</li>
<li>create 创建代码模块，详细：she create –help</li>
<li>server 本地server相关命令，详细：she server –help</li>
<li>release 发布当前模块，详细：she release –help</li>
<li>releaseall 发布当前目录下所有模块代码，详细：she releaseall –help</li>
</ul>



<h2 id="配置信息">配置信息</h2>

<p>每个模块的根目录下需要添加<code>fis-conf.js</code>文件作为模块的配置文件，详细的配置说明请参阅：<a href="http://fis.baidu.com/docs/api/fis-conf.html">http://fis.baidu.com/docs/api/fis-conf.html</a></p>
</div>