define(['jquery', 'extensions/lightapi'], function () {
    //所有tab在tabs声明一下
    var tabs = {
        'introduce': '景区介绍',
        'gallery': '景区图片',
        'routes': '景区路线',
        'tourguide': '景区导览',
        'tickets': '景区路线',
        'weather': '景区天气',
        'heatmap': '景区热力图'
    }
    var referrer = document.referrer; 

    //获取参数
    function getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $(document).ready(function() {
        var openid = getUrlParam('openid');
        var hostname = getUrlParam('hostname');
        var tplid = getUrlParam('tplid');
        var sid = getUrlParam('sid');
        var cancelhref = '';
        var backhref = '';
        var zhida_refer = getUrlParam('zhida_refer');
        //暴力判断是否是qa环境
        if ((window.location.href).match(/(hotspot.baidu.com)/g)) {
            if (hostname == 'qing') {
                cancelhref = 'http://qing.baidu.com/console#light/' + openid;
                backhref = 'http://qing.baidu.com/console#light!from=appbuilder&ref=home&'
                        + 'tpl=' + tplid + '&appid=' + openid;
            } else if (hostname == 'zhida') {          
                cancelhref = zhida_refer;
                backhref = 'http://appbuilder.baidu.com/app/editapp/'
                            + sid 
                            + '?zhida_refer=' + zhida_refer
                            + '&appid%3D' + openid;   
            }
        } else {
            if (hostname == 'qing') {
                cancelhref = 'http://qing.baidu.com:8081/console#light/' + openid;
                backhref = 'http://qing.baidu.com:8081/console#light!from=appbuilder&ref=home&'
                        + 'tpl=' + tplid + '&appid=' + openid;
            } else if (hostname == 'zhida') {
                cancelhref = zhida_refer;
                backhref = 'http://1.xappbuilder.newoffline.bae.baidu.com/app/editapp/'
                            + sid 
                            + '?zhida_refer=' + zhida_refer
                            + '&appid%3D' + openid;        
            }
        }
                    + 'tpl=' + tplid + '&appid=' + openid;
        $('#mp-bar-a-cancel')
            .attr('href', cancelhref);
        $('#mp-bar-a-back')
            .attr('href', backhref);
    });


    
    var events = function () {
        $('.mp-bar-check-data').click(function(event) {
            $('.mp-manage-moduleitem li').each(function(index, el) {
                var booleanTemp = $(this).attr('class');
                booleanTemp = !!booleanTemp ? !!booleanTemp.match(/disable/g) : false;
                if (booleanTemp) {
                    $(this).removeClass('mp-manage-errortips');
                }
            });
        });
        
        $('.mp-manage-cover .mp-manage-savebutton').on('click', function(event) {
            var counter = 0;
            var temp = setInterval( function () {
                $('.mp-bar-check-data').trigger('click');
                counter++;
                // console.log(counter);
                if (counter > 2) {
                    clearInterval(temp);
                }
            }, 1000);           
        });     

        $('.mp-bar-button-complete').click(function(event) {
            var li = [];
            var disable = [];
            var navs = null;
            var modules = null;
            var notOk = [];
            var info = '';
            //获取不需要的填写的tab，并且移除可能有的红圈
            $('.mp-manage-moduleitem li').each(function(index, el) {
                li[index] = $(this).attr('data-module');
                disable[index] = '';
                var booleanTemp = $(this).attr('class');
                booleanTemp = !!booleanTemp ? !!booleanTemp.match(/disable/g) : false;
                if (booleanTemp) {
                    disable[index] = $(this).attr('data-module');
                    $(this).removeClass('mp-manage-errortips');
                }
            });

            lightapp.get('modules', function (err, res) {
                if (err === null) {
                    modules = res;
                    for (var i = 1, j = li.length; i < j; i++) {
                        if (modules[li[i]] != undefined && disable[i] == '') {
                            $('.mp-manage-moduleitem li[data-module=' + li[i] + ']')
                                .removeClass('mp-manage-errortips');
                        } else if (disable[i] == '' && li[i] != 'tickets'){
                            notOk.push(li[i]);
                            $('.mp-manage-moduleitem li[data-module=' + li[i] + ']')
                                .addClass('mp-manage-errortips');
                        }
                    }
                    console.log(notOk);
                    if (notOk.length) {
                        for (var i = 0, j = notOk.length; i < j; i++) {
                            info += tabs[notOk[i]];
                        }
                        alert(info + '尚未填写');
                    } else {
                        lightapp.app.publish(function (err, res) {
                            if (err === null) {
                                if (!!referrer.match(/qing.baidu.com/g)) {
                                    window.location.href = 'http://qing.baidu.com/console';
                                } 
                            } else {
                            }
                        });
                    }
                }
            });
        });
    };

    events();
})