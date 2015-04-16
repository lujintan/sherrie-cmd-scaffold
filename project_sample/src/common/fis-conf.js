/**
 * @author <%= author%>
 * @version 0.0.1
 * @module common
 * @fileOverview the module example
 */

//merge the fis config
fis.config.merge({
    namespace: 'common'
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
        pack: {
            '/static/common/base.js': [
                /\/static\/js\/lib\/[\w\W]*.js/,
                /\/static\/js\/core\/[\w\W]*.js/
            ],
            '/static/common/base.css': [
                /\/static\/css\/\w*.(?:scss|css)/
            ]
        }
    <%}%>
});

fis.config.set('statics', '/static<%= project_name%>');