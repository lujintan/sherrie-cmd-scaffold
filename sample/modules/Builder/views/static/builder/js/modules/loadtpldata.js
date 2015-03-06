define(['jquery', 'lightapp', 'extensions/lightapi', 'page/config'], function(jquery_val, lightapp_val, lightapi, pageconfig) {

    function loadData(callback) {
        //获取url的参数值
        var getQueryString = function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }

        var urlTpl = getQueryString('hotspot_tpl');
        var url = '/static/builder/js/data/tpls/' + urlTpl + '.json';
        if (!urlTpl) return callback(); // do nothing
        // Support clone app
        if (urlTpl.match(/^\d+$/)) { // is int, is appid
            //线上能用appid获得数据，但是线下开发测试时，只能用token
            //clone的目的是copy线上数据用于线下开发
            url = 'http://itrip.baidu.com/api/app/data?appid=' + urlTpl;
            lightapp.clear(function (err) {
                if (err === null) {
                    checkData(urlTpl, url, callback);
                }
            });
        // 只是换模板
        } else {
            checkData(urlTpl, url, callback);
        }
    }

    function checkData (urlTpl, url, callback) {
        console.log('获取模板参数： ' + urlTpl);
        if (urlTpl === null) {
            console.log('模板参数为空，不加载指定模板');
        } else {
            console.log('检查是否存在模板（避免自动更新等情况）');
            pageconfig['tplName'] = urlTpl;
            lightapp.get('index', function(err, val) {
                console.log('返回的必须模板数据val: ' + val);
                if (err === null && val) {
                    console.log('存在模板');
                    //查看当前url中模板类型是否与实际类型一致
                    console.log('查看当前url中模板类型是否与实际类型一致');

                    if (val.tpl == urlTpl) {
                        console.log('模板匹配');

                        callback();
                    } else {
                        console.log('模板不匹配，设置新模板');
                        lightapp.set('index.tpl', urlTpl, function(err) {
                            if (err === null) {
                                callback();
                            } else {
                                console.log('设置新模板失败');
                            }
                        });
                    }
                } else if (err === null && val === null) {
                    console.log('不存在模板');
                    console.log('载入指定模板');
                    $.ajax({
                            url: url,
                            type: 'GET',
                            dataType: 'json',
                            async: false
                        })
                        .done(function(data) {
                            // console.log("success");
                            //不能并行lightapp.set()
                            lightapp.set('index', data.index, function (err) {
                                if (err === null) {
                                    lightapp.set('modules', data.modules, function (err) {
                                        if (err === null) {
                                            if (urlTpl.match(/^\d+$/)) {
                                                lightapp.set('setting', data.setting, function (err) {
                                                    if (err === null) {
                                                        var nowTpl = data.index;
                                                            nowTpl = nowTpl.tpl;
                                                        var nowHref = window.location.href;
                                                        var nowState = nowHref.match(/(manage).*/g);
                                                        var newUrl = nowState[0]
                                                            .replace(/(hotspot_tpl=)\d+/g, 'hotspot_tpl=' + nowTpl);
                                                        window.history.replaceState('', '', newUrl);
                                                        callback();
                                                    } else {
                                                        lightapp.clear();
                                                        console.log('加载模块信息失败: ' + err);
                                                    }
                                                });
                                            } else {
                                                callback();
                                            }
                                        } else {
                                            lightapp.clear();
                                            console.log('加载模块信息失败: ' + err);
                                        }
                                    });
                                } else {
                                    console.log('加载基本信息失败：' + err);
                                }
                            });
                        })
                        .fail(function() {
                            console.log("error");
                        })
                } else {
                    console.log("载入数据错误：" + err);
                }
            });
        }
    }


    return {
        initappdata: function(options) {
            var renderapp = options.renderapp;

            loadData(renderapp);
        }
    }
});