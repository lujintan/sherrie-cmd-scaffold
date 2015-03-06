define(['jquery', 'lightapp', 'widget/citylist'], 
    function (jquery_val, lightapp_val, citylist) {

    var citys = '';
    var heatmap = {
        province: '',
        city: '',
        poiname: '',
        centerPoint: '',
        x:'',
        y: ''
    }

    var widgets = {
        checkSpot: function (province, city, poiname) {
            $('#mp-heatmap-hotspot').html('<option value="请选择" index="-1" selected>请选择</option>');
            $('.mp-heatmap-information').text('查询该城市是否有热力数据中，请稍等');

            if (poiname) {
                poiname = poiname;
            } else if (city != '请选择') {
                poiname = city;
            } else if (province != '请选择') {
                poiname = province;
            }
            console.log('正在查询城市：' + poiname + '是否有景点');
            
            var time = new Date();
            time = time.getTime();
            time = time.toString().substring(0, 10);

            $('.mp-heatmap-submit').attr('disabled', true).css('background-color', '#A6A6A6');
            $('#mp-heatmap-hotspot').attr('disabled', true);
            $('.mp-heatmap-selected').text('');

            $.ajax({
                url: 'http://spotshot.baidu.com/getRankHotView.php?poiname=' 
                    + poiname + '&time=' + time,
                type: 'GET',
                dataType: 'jsonp'
            })
            .done(function (val) {
                if (val.poiname.match(poiname)) {
                    var spotList = val.data;
                    var spothtml = '<option value="请选择" index="-1" selected>请选择</option>';

                    for (var i = 0, j = spotList.length; i < j; i++) {
                        spothtml += '<option value="' + spotList[i].poiname + '" index="' 
                                    + i + '">' 
                                    + spotList[i].poiname 
                                    + '</option>'; 
                    }

                    $('#mp-heatmap-hotspot').html(spothtml);
                    setTimeout(function () {
                        $('.mp-heatmap-information').text('');
                    }, 1000);
                    $('.mp-heatmap-submit').text('保存并预览');
                    $('.mp-heatmap-submit-info').text('');
                    $('.mp-heatmap-submit').attr('disabled', false).css('background-color', '#498BFC');
                    $('#mp-heatmap-hotspot').attr('disabled', false);
                } else {
                    console.log('not match');
                    //此城市没有收录相应数据'
                    $('.mp-heatmap-information').text('');
                    $('.mp-heatmap-submit').text('暂无数据');
                    $('.mp-heatmap-submit-info').text('建议您取消添加热力图组件');
                }
            })
        },
        refreshSpot: function () {
            var province = $('#mp-heatmap-province').find('option:selected').val();
            var city = $('#mp-heatmap-city').find('option:selected').val();
            widgets.checkSpot(province, city );
        }
    }

    //初始化界面
    jQuery(document).ready(function($) {
        $.ajax({
                url: '/static/builder/js/data/lib/citys.json',
                type: 'GET',
                dataType: 'json',
                data: {
                    param1: 'value1'
                },
            })
            .done(function(val) {
                citys = val;
                var dataProvince = citys.China;
                var dataCity = '';
                var dataArea = '';
                var htmlProvince = '';
                for (var i = 0, j = dataProvince.length; i < j; i++) {
                    if (i === 0) {
                        htmlProvince += '<option value="' + dataProvince[i].name + '" index="' 
                                + i + '" selected>' 
                                + dataProvince[i].name 
                                + '</option>'; 
                    } else {
                        htmlProvince += '<option value="' + dataProvince[i].name + '" index="' 
                                + i + '">' 
                                + dataProvince[i].name 
                                + '</option>'; 
                    }
                }
                $('#mp-heatmap-province').html(htmlProvince);

                //联动事件
                $('#mp-heatmap-province').change(function () {
                    var province = $(this).find("option:selected").val();
                    var index = $(this).find("option:selected").attr('index');
                    //判断是否是直辖市或之类的区域
                    //true
                    if (!dataProvince[index].sub[0].sub) {
                        $('#mp-heatmap-city')
                            .html('<option value="' + province + '">' + province +'</option>');
                        dataArea = dataProvince[index].sub;
                        var htmlArea = '';
                        for (var i = 0, j = dataArea.length; i < j; i++) {
                            if (0 === i) {
                                htmlArea += '<option value="' + dataArea[i].name + '" index="' 
                                        + i + '" selected>' 
                                        + dataArea[i].name 
                                        + '</option>';
                            } else {
                                htmlArea += '<option value="' + dataArea[i].name + '" index="' 
                                        + i + '">' 
                                        + dataArea[i].name 
                                        + '</option>';    
                            }
                        }
                        $('#mp-heatmap-area').html(htmlArea);
                        //直辖市这类的情况下，直接搜是否有对应景区
                        setTimeout(function () {
                            widgets.refreshSpot();
                        }, 1000); 
                    } else {
                        dataCity = dataProvince[index].sub;
                        var htmlCity = '';
                        for (var i = 0, j = dataCity.length; i < j; i++) {
                            if (0 === i) {
                                htmlCity += '<option value="' + dataCity[i].name + '" index="' 
                                            + i + '" selected>' 
                                            + dataCity[i].name 
                                            + '</option>';
                            } else {
                                htmlCity += '<option value="' + dataCity[i].name + '" index="' 
                                            + i + '">' 
                                            + dataCity[i].name 
                                            + '</option>';
                            }
                        }
                        $('#mp-heatmap-city').html(htmlCity);
                        $('#mp-heatmap-area')
                            .html('<option value="请选择" index="0" selected>请选择</option>');
                    }
                });
                
                lightapp.get('modules.heatmap', function (err, val) {
                    if ((err === null) && val) {
                        $('#mp-heatmap-province')
                                .find('option[value=' + val.province +']')
                                .attr('selected', true);
                            $('#mp-heatmap-province').trigger('change');
                            setTimeout(function () {
                                $('#mp-heatmap-city')
                                    .find('option[value=' + val.city + ']')
                                    .attr('selected', true);
                                $('#mp-heatmap-city').trigger('change');
                                setTimeout(function () {
                                    $('#mp-heatmap-hotspot')
                                        .find('option[value=' + val.poiname + ']')
                                        .attr('selected', true);
                                    $('#mp-heatmap-hotspot').trigger('change');
                                }, 1888);
                            }, 888);
                    } else {
                        // alert('热力图初始化数据失败');
                    }
                });
            })

    });

    

    var events = function () {
        $('#mp-heatmap-province').change(function () {
            $('#mp-heatmap-hotspot').html('<option value="请选择" index="-1" selected>请选择</option>');
            $('.mp-heatmap-selected').text('');      
        });
        
        $('#mp-heatmap-city').change(function () {
            setTimeout(function () {
                widgets.refreshSpot();
            }, 1000);
        });
        
        $('#mp-heatmap-hotspot').change(function () {
            var province = $('#mp-heatmap-province').find('option:selected').val();
            var city = $('#mp-heatmap-city').find('option:selected').val();
            var hotspot = $('#mp-heatmap-hotspot').find('option:selected').val();
            var time = new Date();
            time = time.getTime();
            time = time.toString().substring(0, 10);
            //获取景点的热点数据
            $('.mp-heatmap-submit').attr('disabled', true).css('background-color', '#A6A6A6');
            $.ajax({
                url: 'http://spotshot.baidu.com/getSpotHot.php?poiname=' + hotspot + '&time=' + time + '&city=' + city,
                type: 'GET',
                dataType: 'jsonp'
            })
            .done(function(val) {
                var val = val.data;
                if (!val.length) {
                    $('.mp-heatmap-submit-info').text('建议您取消添加热力图组件');
                    $('.mp-heatmap-submit').text('暂无数据');
                    $('.mp-heatmap-selected').text('');
                    return false;
                }
                $('.mp-heatmap-submit').attr('disabled', false).css('background-color', '#498BFC');
                $('.mp-heatmap-submit-info').text('');
                //分别存入各
                var xArray = [];
                var yArray = [];
                var tempVal = '';
                for (var i = 0, j = val.length; i < j; i++) {
                    tempVal = val[i];
                    xArray[i] = parseFloat(tempVal.x);
                    yArray[i] = parseFloat(tempVal.y);
                }
                var xBig = xArray[0];
                var xSmall = xArray[0];
                var xTemp = 0;
                var yBig = yArray[0];
                var ySmall = yArray[0];
                var yTemp = 0;
                for (var i = 0, j = xArray.length; i < j; i++) {
                    xTemp = xArray[i];
                    yTemp = yArray[i]
                    if (xTemp >= xBig) {
                        xBig = xTemp;
                    }
                    if (xTemp <= xSmall) {
                        xSmall = xTemp;
                    }
                    if (yTemp >= yBig) {
                        yBig = yTemp;
                    }
                    if (yTemp <= ySmall) {
                        ySmall = yTemp;
                    }
                }
                val = val[0];
                var xTemp = val.x;
                var yTemp = val.y;
                heatmap.province = province;
                heatmap.city = city;
                heatmap.poiname = hotspot;
                heatmap.x = (xBig + xSmall) / 2;
                heatmap.y = (yBig + ySmall) / 2;
                heatmap.centerPoint = (heatmap.x).toFixed(6) + ',' + (heatmap.y).toFixed(6);
                var text = ' 经纬度(' + heatmap.centerPoint + ')';
                $('.mp-heatmap-selected').text(text);
            })
        });

        $('.mp-heatmap-submit').click(function () {
            if (heatmap.poiname && heatmap.centerPoint) {
                lightapp.set('modules.heatmap', heatmap, function (err) {
                    if (err === null) {
                        window.BuilderEvent 
                        && window.BuilderEvent.fire("modulepreview", "heatmap", true);
                        console.log('景区热力图设置成功');
                    } else {
                        alert('设置失败');
                    }
                });
            } else {
                alert('请选择景点');
            }
        });
    }

    events();

});