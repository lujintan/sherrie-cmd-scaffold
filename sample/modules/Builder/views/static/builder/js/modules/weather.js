define(['jquery', 'lightapp', 'widget/citylist'], 
    function (jquery_val, lightapp_val, citylist) {

    jQuery(document).ready(function($) {
        $.ajax({
                url: '/static/builder/js/data/lib/weatherCities.json',
                type: 'GET',
                dataType: 'json'
            })
            .done(function(val) {
                citys = val;
                var dataProvince = citys
                var dataCity = '';
                var dataArea = '';
                var htmlProvince = '<option value="请选择" selected>请选择</option>';
                for (var each in dataProvince) {
                    htmlProvince += '<option value="' + each + '">' 
                                + each 
                                + '</option>'; 
                }
                $('#mp-weather-province').html(htmlProvince);

                //联动事件
                $('#mp-weather-province').change(function () {
                    var province = $(this).find("option:selected").val();
                    var htmlCity = '<option value="请选择" selected>请选择</option>';
                    var htmlArea = '';
                    dataCity = dataProvince[province];
                    for (var each in dataCity) {
                        htmlCity += '<option value="' + each + '">' 
                                + each 
                                + '</option>';
                        $('#mp-weather-city').html(htmlCity);
                        $('#mp-weather-area')
                            .html('<option value="请选择" index="0" selected>请选择</option>');
                    }
                });
                lightapp.get('modules.weather', function (err, val) {
                    if ((err === null) && val) {
                        $('#mp-weather-province')
                            .find('option[value=' + val.province +']')
                            .attr('selected', true);
                        $('#mp-weather-province').trigger('change');
                        setTimeout(function () {
                            $('#mp-weather-city')
                                .find('option[value=' + val.city + ']')
                                .attr('selected', true);
                        }, 888);
                    }
                });
            })
    });

    $('.mp-weather-submit').click(function () {
        var province = $('#mp-weather-province').find('option:selected').val();
        var city = $('#mp-weather-city').find('option:selected').val();
        
        if (province == '请选择' || city == '请选择') {
            alert('尚未选择地点');
        } else {
            lightapp.set('modules.weather', 
            {
                province: province,
                city: city
            }, function (err) {
                if (err === null) {
                    window.BuilderEvent 
                    && window.BuilderEvent.fire("modulepreview", "weather", true);
                    console.log('景区天气设置成功');
                } else {
                    console.log('设置失败');
                }
            });
        }
    });
});