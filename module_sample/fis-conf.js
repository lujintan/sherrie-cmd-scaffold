/**
 * @author <%= author%>
 * @version <%= version%>
 * @module <%= moduleName%>
 * @fileOverview <%= desc%>
 */

//merge the fis config
fis.config.merge({
    namespace: '<%= moduleName%>'
});

fis.config.merge({
    <%if (fid) {%>
        modules: {
            postpackager: 'ext-map'
            //packager : 'autopack' 上线common插件第二天后开启使用
        },
        //插件参数设置
        settings: {
            packager : {
                autopack : {
                    //fid为接入自动合并后分配的产品线FID字符串
                    'fid' : '<%=fid%>'
                    //默认自动获取SVN分支(需安装svn命令)，自动获取失败请手动在此配置svn分支
                    //'svn' : 'https://svn.baidu.com/branches/xx'   
                }
            }
        }
    <%} else {%>
        //文件打包配置
        pack: {
            '/static/<%= moduleName%>/app.js': [
                /\/static\/js\/core\/\w*.js/,
                /\/static\/js\/app\/\w*.js/,
                /\/widget\/\w+\/[\w\W]*.js/
            ],
            '/static/<%= moduleName%>/app.css': /\/widget\/\w+\/\w*.(?:scss|css)/
        }
    <%}%>
});


fis.config.get('roadmap.path').unshift({
    reg: /\/static\/js\/app\/((?!.*[init]\.js$)[\s\S]+)/,
    release: '/static<%= projectName%>/${namespace}/js/app/$1',
    isMod: true
});

fis.config.get('roadmap.path').unshift({
    reg: /\/static\/js\/core\/((?!.*[invoke|ofa]\.js$)[\s\S]+)/,
    release: '/static<%= projectName%>/${namespace}/js/core/$1',
    isMod: true
});

fis.config.set('statics', '/static<%= projectName%>');