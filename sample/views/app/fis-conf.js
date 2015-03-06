fis.config.merge({
    namespace: '<%=moduleName%>',
    pack: {
        '/static/app.js': [
            /\/static\/js\/core\/\w*.js/,
            /\/static\/js\/app\/\w*.js/,
            /\/static\/js\/\w*.js/,
            /\/widget\/[\w\W]+\/\w*.js/
        ],
        '/static/app.css': [
            /\/widget\/[\w\W]+\/\w*.(?:scss|css)/,
            /\/static\/css\/app\/\w*.(?:scss|css)/
        ]
    }
});

fis.config.get('roadmap.path').unshift({
    reg: /\/static\/js\/app\/(?!.*[init]\.js$)[\s\S]+/,
    isMod: true
});

fis.config.get('roadmap.path').unshift({
    reg: /\/static\/js\/core\/(?!.*[invoke|ofa]\.js$)[\s\S]+/,
    isMod: true
});

//线上环境关闭console
fis.config.set('settings.optimizer.uglify-js', {
    compress : {
        drop_console: true
    }
});

//scss后缀的文件，用fis-parser-sass插件编译
fis.config.set('modules.parser.scss', 'sass');
//scss文件产出为css文件
fis.config.set('roadmap.ext.scss', 'css');