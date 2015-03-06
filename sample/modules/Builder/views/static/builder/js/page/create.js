require.config({
    baseUrl: '/static/builder/js',
    paths: {
        lightapp:"http://apps.bdimg.com/developer/static/2/assets/appbuilder/lightapp_builder.min",
        jquery: 'http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min',
        underscore: 'http://apps.bdimg.com/libs/underscore.js/1.7.0/underscore-min',
        backbone: 'http://apps.bdimg.com/libs/backbone.js/1.1.2/backbone-min',
    },
    shim: {
        jquery: {
            exports: '$',
        },
        underscore: {
            exports: '_',
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        app: {
            deps: ['backbone'],
        }
    }
})
// 对于不用的，声明时用  name_val 占坑
define(['lightapp', 
        'jquery', 
        'modules/simulation',
        'extensions/lightapi',
        'modules/loadtpldata'
    ], function(
        lightapp_val, 
        jquery_val, 
        simulation,
        lightapi,
        loadtpldata_val
    ){
    
    var index = {
        tpl: '',
        title: '',
        style: {
            themeColor: ''
        }
    }; 
    var isNextRead = 0;
    var oDom = {
        myIframe: document.getElementById('mp-iframe'),
        isOk: 0,
        hasColor: 0
    }
    var widget = {
        //看用户选择情况
        checkSelected: function () {
                var oDiv = $('.mp-create-lists');
                var oColor = $('.mp-create-color');
                lightapp.get('index', function (err, val) {
                    if(err === null && val){
                        var tempVal = val.style;
                        var valThemeColor = tempVal.themeColor;
                        for(var i = 0, j = oDiv.length; i < j; i++){
                            if(oDiv.eq(i).attr('mp-tpl') == val.tpl){
                                oDiv.eq(i).addClass('mp-create-lists-selected');
                                $('.mp-create-selected-show').html(val.title);
                                $('.mp-color-selected').html(valThemeColor);
                                oDom.isOk = 1;
                            }
                        }
                        for(var i = 0, j = oColor.length; i < j; i++){
                            if(oColor.eq(i).attr('color') == valThemeColor){
                                oColor.eq(i).addClass('mp-create-color-show');
                                $('.mp-color-selected').html(valThemeColor);
                                oDom.hasColor = 1;
                            }
                        }
                    } else if (err === null) {
                        console.log('widegt.checkSelected \'err\' situation: ' + err);
                        console.log('widegt.checkSelected \'val\' situation: ' + val);
                        $('#mp-iframe').hide();
                    } else {
                        console.log('widegt.checkSelected error: ' + err);
                    }
                });
            },
        //获取url的参数值
        getQueryString: function (name) {
                var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                } 
                return null;
            },  
        //@param {number} isNull 当isNull为1，src = ''
        refreshIframe: function (isNull) {
                //刷新iframe内容
                if(isNull){
                    $('#mp-iframe').hide();
                    oDom.myIframe.src = oDom.myIframe.src;
                } else {
                    lightapi.setValue('index', index, function (err) {
                        if(err === null){
                            oDom.myIframe.src = oDom.myIframe.src;
                            $('#mp-iframe').show();
                        }
                    });
                }
            }
    }

    var events = function () {
        //选中模板
        $('.mp-create-lists').click(function () {
            $('.mp-create-lists').removeClass('mp-create-lists-selected');
            $(this).addClass('mp-create-lists-selected');

            $('.mp-create-selected-show').html($(this).attr('mp-title'));
            index.tpl = $(this).attr('mp-tpl');
            index.title = $(this).attr('mp-title');
            index = {
                tpl: index.tpl,
                title: index.title,
                style: { 
                    themeColor: index.style.themeColor
                }
            };
            widget.refreshIframe();
            oDom.isOk = 1;
        });
        //选中颜色
        $('.mp-create-color').click(function () {
            $('.mp-create-color').removeClass('mp-create-color-show');
            $(this).addClass('mp-create-color-show');
            $('.mp-color-selected').html($(this).attr('color'));
            index.style.themeColor = $(this).attr('color');
            index.tpl = $('.mp-create-lists-selected').attr('mp-tpl');
            oDom.hasColor = 1;
            //刷新iframe内容
            index = {
                tpl: index.tpl,
                title: index.title,
                style: { 
                    themeColor: index.style.themeColor
                }
            };
            if (index.tpl) {
                widget.refreshIframe();
            } else {
                widget.refreshIframe(1);
            }
            
        });
        //取消选择
        $('.mp-create-cancel').click(function () {
            lightapi.setValue('index', {
                    tpl: '',
                    title: '',
                    style: { 
                        themeColor: ''
                    }
                }, function (err, val) {
                    if (err === null) {
                        $('.mp-create-selected-show').html('请选择模板');
                        $('.mp-color-selected').html('请选择颜色');
                        $('.mp-create-lists').removeClass('mp-create-lists-selected');
                        // $('.mp-create-lists').eq(0).addClass('mp-create-lists-selected');
                        $('.mp-create-color').removeClass('mp-create-color-show');
                        oDom.isOk = 0;
                        oDom.hasColor = 0;
                        alert('取消成功，请重新选择');
                        widget.refreshIframe(1);
                    } else {
                        alert('取消失败');
                    }

            });
            // lightapp.set('index', {
            //     tpl: '',
            //     title: '',
            //     style: { 
            //         themeColor: ''
            //     }
            // }, function (err, val) {
            //     if(err === null){
            //         $('.mp-create-selected-show').html('请选择模板');
            //         $('.mp-color-selected').html('请选择颜色');
            //         $('.mp-create-lists').removeClass('mp-create-lists-selected');
            //         // $('.mp-create-lists').eq(0).addClass('mp-create-lists-selected');
            //         $('.mp-create-color').removeClass('mp-create-color-show');
            //         oDom.isOk = 0;
            //         oDom.hasColor = 0;
            //         alert('取消成功，请重新选择');
            //         widget.refreshIframe(1);
            //     } else {
            //         alert('取消失败');
            //     }
                
            // });
            
        });
        //下一步
        $('.mp-create-nextStep').click(function () {
            // window.location.href = '/builder/app/manage?token=' + widget.getQueryString('token');
            if(oDom.isOk && oDom.hasColor){
                lightapi.setValue('index', index, function (err) {
                    if(err === null) {
                        window.location.href = '/builder/app/manage?token=' + widget.getQueryString('token');
                    }
                });
                
            }else if (!oDom.isOk) {
                alert ('请选择一个模板');
            } else if (!oDom.hasColor) {
                alert ('请选择颜色');
            }
        });
    }
    
    //初始化事件
    events();
    //初始化选择情况
    widget.checkSelected();
    //设置iframe的src
    oDom.myIframe.src += 'token=' + widget.getQueryString('token');
    
    //createapp.init();
    $('.test_button').on('click', function () {
        simulation.refresh(1);
    });
})