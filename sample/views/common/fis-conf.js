fis.config.merge({
    namespace: 'common',
    pack: {
        '/static/base.js': [
            /\/static\/js\/lib\/[\w\W]*.js/,
            /\/static\/js\/core\/[\w\W]*.js/,
            /\/widget\/[\w\W]+\/\w*.js/
        ],
        '/static/base.css': [
            /\/static\/css\/\w*.(?:scss|css)/,
            /\/widget\/[\w\W]+\/\w*.(?:scss|css)/
        ]
    }
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