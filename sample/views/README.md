###webapp工程化开发
####目前实现方案
+ 基于fisp，构建、资源加载、目录规范
+ 统一后端渲染，重新定义预加载页面的实现方案
+ 升级局部刷新方案，添加页面预加载模式
+ 定义应用级别的初始化入口
+ 定义组件级别的初始化入口，以及组件接入方式
+ 集成最小可用三方lib



####基于上述方案归纳开发一个webapp的步骤
+ 安装fisp和入门：http://oak.baidu.com/fis-plus/document.html#快速入门
+ 熟悉局部刷新方案原理和fisp插件：http://oak.baidu.com/fis-plus/document.html#Quickling解决方案
+ 定义开发、部署目录结构
+ 定义页面级、组件级的模版、静态资源组织形式
+ 添加页面预加载：
    + 定义预加载页面和对应链接
    + 应用初始化时（或者触发预加载的逻辑点），调用局刷的接口、设定为预取数据、前端数据缓存、延迟渲染
+ 定义模块化开发的方案
    + 收敛应用级别初始化为有限接口（值的初始化、事件绑定）
    + 收敛组件为有限接口（值的初始化、事件绑定），并定义接口实现规则
+ 开发页面和组件
+ 添加性能监控
+ 项目构建配置，产出待部署的代码



#### 基本概念
``` html
    + 规范
        - 开发
            －模块化：js、css模块形式保存
            －组件化：同一组件的js、css、tpl放在一起
            - 三方模块维护
            - 组件生态和接入
        - 部署
            －非覆盖式发布，md5
            －静态资源CDN
    + 框架
        - js模块化加载，请求合并等性能优化方法
        - 应用级别初始化统一入口
        - 组件级别初始化统一入口
    + 自动化构建
        - 编译：xxx编译为css、xxx编译为js
        - 压缩、替换、合并：js、css、图片压缩、合并，CDN替换
        - 监听、自动刷新
        - 本地预览
    + 自动化测试和监控
        - 性能、异常监控
        - 准入测试
        - 自动化测试（UI、逻辑）
```

#### 规范
+  开发目录
```html
    src:

    project
        －common         通用模块
            －page           －layout级别模版
                - layout1.tpl
                - layout2.tpl
            －plugin         －fis插件
            －static         －存放基础非模块化资源
                - js
                    - lib
                    - test
                - css
                    - lib
                        - reset.scss
                        - ...
                    - core
                        - consts.scss
                        - mixins.scss
                        - ...
                    - main.scss
            －widget         －公用组件
                - loading
                    - js
                    - css
                    - img
                    - tpl
        －app1           业务模块app1
            －page           －业务级别的父模版
                - page1.tpl
                - page2.tpl
            - static        - 模块级别的静态资源
                - js
                - css
                - img
            －widget         －业务组件
                - header
                    - js
                    - css
                    - img
                    - tpl
                - slider
                - ...
            fis-conf.js
        －app2           业务模块app2
            －page           －业务级别的父模版
            －static
            －widget         －业务组件
        －app3 ...
```

+  部署目录示例
通过配置fis打通开发规范和部署规范
``` html
    build:

    project
        - config
        - common
            - plugin
        - app1
            - page
            - widget
                - widget1
                    - tpl
                - widget2
                    - tpl
        - app2
            - page
            - widget
        - st
            - project
                - common
                    - js
                    - css
                    - img
                - app1
                    - widget1
                        - js
                        - css
                        - img
                    - widget2
                        - js
                        - css
                        - img
                - app2
                - app3
                - ...
```

#### 框架
+  模块化框架，支持自动化性能优化
        - js模块化封装、加载，请求合并等性能优化方法
            - mod.js
            - 同步预加载的用require(XXX)
            - 异步加载的用require.async(XXX, callback)
        - 应用级别初始化统一入口
        - 组件级别初始化统一入口

#### 自动化构建
+  支持less、stylus、sass编译为css；以及coffee等编译为js
+  支持js、css、图片压缩合并
+  文件监听、浏览器自动刷新
+  本地预览、数据模拟

#### 自动化测试和监控
+   UI测试
+  逻辑测试
+  准入测试
+  性能监控
+  异常监控


版本地址：http://gitlab.baidu.com/gaojiexuan/webapp-smarty-seed.git