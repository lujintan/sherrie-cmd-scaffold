# sherrie

## 环境依赖
- 确保你已安装了[Node](http://nodejs.org)
- 确保你已安装了php (快速安装推荐[wamp](http://www.wampserver.com/en/)和[xampp](https://www.apachefriends.org/index.html))

##安装

```bash
npm install -g sherrie
```

##快速开始

##### 第一步，创建项目
```bash
she install
```

需要按照提示输入：

* project name(项目名)
* FID(Fis 自动打包功能对应的产品线id，直接输入Enter表示不使用自动打包功能)
* author(作者)

#### 第二步，启动本地服务器

```bash
#启动服务器
she server start
#初始化服务器框架
she server init
```

#### 第三步，发布本地测试代码

```bash
she releaseall
```

#### 第四步，预览效果
[http://127.0.0.1:8080/app/page/home](http://127.0.0.1:8080/app/page/home)

##命令列表

```bash
#查阅命令
she --help
#查阅命令配置项
she <command> --help
```

* install 创建项目，详细：she install --help
* create 创建代码模块，详细：she create --help
* server 本地server相关命令，详细：she server --help
* release 发布当前模块，详细：she release --help
* releaseall 发布当前目录下所有模块代码，详细：she releaseall --help

##配置信息

每个模块的根目录下需要添加`fis-conf.js`文件作为模块的配置文件，详细的配置说明请参阅：[http://fis.baidu.com/docs/api/fis-conf.html](http://fis.baidu.com/docs/api/fis-conf.html)