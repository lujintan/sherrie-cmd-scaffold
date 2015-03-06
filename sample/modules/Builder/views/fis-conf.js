fis.config.merge({
    roadmap: {
        domain: 'http://static.qyy.baidu.com',
        path: [
            {
                reg: /^\/static\/(.*)/i,
                release: '/static/$1',
            },
        ]
    },

    project: {
        include: [
            'tpls/**',
            'static/builder/css/**',
            'static/builder/js/**',
            'static/builder/images/**',
        ],
        fileType : {
            image : 'eot, svg, ttf, woff'
        }
    },

    pack: {
        '/static/builder/js/init.js': [
            '/static/builder/js/lib/zepto.js',
            '/static/builder/js/lib/underscore.js',
            '/static/builder/js/core/*.js'
        ]
    }
});


fis.config.set('modules.postpackager', 'simple')