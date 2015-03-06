define([
        'jquery',
        'extensions/fileupload',
        'lightapp',
        'modules/simulation',
        'lib/jquery.datetimepicker'
    ], function (jquery, fileupload, lightapp_val, simulation) {
    var introduce = {
        name: '',
        address: '',
        traffic: '',
        open: '',
        best: '',
        detail: '',
        image: ''
    }
    var imgUpload = fileupload();
    //其他加载iframe方式可能有缓存
    var iframeUrl = $('#mp-iframe').attr('src');
    var isOk = {
        info: '',
        lenOk: 0,
        contextOk: 0,
        openTimeOk: 1,
        bestTimeOk: 1,
        counter: 4
    }
    
    //初始化界面
    lightapp.get('modules.introduce', function (err, val) {
        if(err === null && val){
            $('.mp-intro-name').val(val.name);
            $('.mp-intro-address').val(val.address);
            $('.mp-intro-traffic').val(val.traffic);

            $('.mp-intro-open').val(val.open);
            var timeTemp = val.open.match(/\d\d/g);
            var timeStart = timeTemp[0] + '时' + timeTemp[1] + '分';
            var timeEnd = timeTemp[2] + '时' + timeTemp[3] + '分' ;
            $('#datetimepicker-open-starttime').val(timeStart);
            $('#datetimepicker-open-endtime').val(timeEnd);
            $('.mp-intro-select-open')
                .val( ((val.open.length - 15) > 0) ? '次日' : '');

            $('.mp-intro-best').val(val.best);
            timeTemp = val.best.match(/\d\d/g);
            timeStart = timeTemp[0] + '月' + timeTemp[1] + '日';
            timeEnd = timeTemp[2] + '月' + timeTemp[3] + '日' ;
            $('#datetimepicker-best-starttime').val(timeStart);
            $('#datetimepicker-best-endtime').val(timeEnd);
            $('.mp-intro-select-best')
                .val( ((val.best.length - 15) > 0) ? '次年' : '');

            $('.mp-intro-detail').val(val.detail);
            var img = new Image();
            img.src = val.image;

            introduce.image = val.image;   //2015.1.9 李宪亮

            var timeT = '';
            timeT = setInterval(function () {
                if (img.complete) {
                    $('.mp-intro-imageupload div[type=\'image-show\']')
                        .css({
                            'background-image': 'url(\'' + val.image + '\')',
                            'background-size': 'cover'
                        });
                    clearInterval(timeT);
                }
            }, 1000)
            refreshStringLen();
        } else if (err === null) {
            //alert('模板数据读取失败，请刷新页面或者返回设置模板');
        } else {
            console.log('get modules.inroduce error: ' + err);
        }
    })
    function imgUpInit() {
        var container = $('.mp-intro-imageupload'), 
            imgPreview = container.find('div[type=\'image-show\']'), 
            fileInput = $('input[name=mp-intro-image]');
        new imgUpload({
            el: fileInput,
            fileTypes: ['jpg', 'png', 'gif', 'bmp', 'jpeg'],
            type: 'POST',
            maxSize : 0.5,
            success: function (file, res) {
                console.log('图片upload success 图片地址 : ' + res.url);
                introduce.image = res.url;
                imgPreview.css('background-image', 'url(\'' + res.url + '\')');
                $('.mp-intro-imageupload .mp-intro-input-right em').html('');
                $('.mp-intro-image-show').removeClass('mp-intro-input');
            },
            error: function (file, res) {
                console.log('upload error : ' + res);
                switch (res) {
                    case 'TYPE_ERROR':
                        $('.mp-intro-imageupload .mp-intro-input-right em')
                            .html('图片格式请采用jpg, png, gif, bmp, jpeg');
                        break;
                    case 'SIZE_ERROR':
                        $('.mp-intro-imageupload .mp-intro-input-right em')
                            .html('图片超出大小限制');
                        break;
                }
            }
        })
    }

    function ChineseNumber(string) {
        var number = 0;
        if (string.match(/[\u4E00-\uFA29]/g)) {
            number = string.match(/[\u4E00-\uFA29]/g).length;
        }
        return number;
    }

    function refreshStringLen(string) {
        var temp = '';
        var string = '';
        var limit = '';
        var counter = isOk.counter;
        var string = string ? 1 : string;

        $('span[type=length-now]').each(function(index, el) {
            temp = $(this).parent().siblings().val().replace(/[^\x00-\xff]/g, 'c').length;
            limit = $(this).siblings().text();
            
            if (temp > limit) {
                console.log('字数超过限制');
                $(this).parent().siblings().addClass('mp-intro-input');
                isOk.info = $(this).parent().parent()
                                .siblings().text().replace('*', '') 
                                + '字数超过限制，请修改';
                isOk.lenOk = 0;
            } else if (isOk.contextOk){
                $(this).parent().siblings().removeClass('mp-intro-input');
                counter--;
                isOk.lenOk = counter ? 0 : 1;
            }
            $(this).text(temp);
        });
    }
    
    function checkData() {
        //时间控件长相不一样，单独调一下
        var timeCounter = 0;
        $('.mp-datetimepicker').each(function(index, el) {
            if (!$(this).val()) {
                timeCounter++;
                $(this).addClass('mp-intro-input');
                switch ($(this).parent().attr('data-type')) {
                    case 'open-time':
                        isOk.openTimeOk = 0;
                        isOk.info = '景区开放时间尚未填写';
                        break;
                    case 'best-time':
                        isOk.bestTimeOk = 0;
                        isOk.info = '最佳旅游时间尚未填写';
                        break;
                }
            } else {
                $(this).removeClass('mp-intro-input');
            }      
        });
        //判断各介绍必填项是否填写
        var _introLists = 'name detail'.split(' ');
        var _introList = '';
        var _reg = /^\s*$/;
        var counter = _introLists.length;
        for (var i = 0, j = _introLists.length; i < j; i++) {
            _introList = '.mp-intro-' + _introLists[i];
            if (!!$(_introList).val() && !_reg.test($(_introList).val())) {
                introduce[_introLists[i]] =
                    $(_introList).val()
                    .replace(/(^\s+)|(\s+$)/g, '');
                $(_introList).removeClass('mp-intro-input');
                counter--;
                isOk.contextOk = counter ? 0 : 1;
            } else {
                isOk.info = $(_introList).parent()
                    .siblings().text().replace('*', '') + '尚未填写';
                $(_introList).addClass('mp-intro-input');
                isOk.contextOk = 0;
            }
        }
        //将非必填项数据插入临时变量
        var _introLists_un = 'address open best traffic'.split(' ');
        var _introList_un = '';
        var _reg = /^\s*$/;
        for (var i = 0, j = _introLists_un.length; i < j; i++) {
            _introList_un = '.mp-intro-' + _introLists_un[i];
            introduce[_introLists_un[i]] =
                $(_introList_un).val()
                .replace(/(^\s+)|(\s+$)/g, '') ?
                $(_introList_un).val()
                .replace(/(^\s+)|(\s+$)/g, '') : ' ';
        }
    }
    var events = function () {
        $('.mp-intro-submit').click(function () {
            if ($('.mp-intro-image-show').css('background-image') !== "none") {
                $('.mp-intro-image-show').removeClass('mp-intro-input');
            } else {
                $('.mp-intro-image-show').addClass('mp-intro-input');
                isOk.info = '请上传图片';
            }

            checkData();
            refreshStringLen ();
            if (!isOk.contextOk || !isOk.lenOk || !isOk.openTimeOk || !isOk.bestTimeOk){
                console.log(isOk);
                alert(isOk.info);
            } else {
                console.log('OK,可以保存了');
                lightapp.set('modules.introduce', introduce, function (err, val) {
                    if (err === null){
                        window.BuilderEvent.fire('modulesave');
                        window.BuilderEvent && 
                        window.BuilderEvent.fire("modulepreview", "introduce", true);
                        $('.mp-manage-moduleitem li[data-module=introduce]')
                            .removeClass('mp-manage-errortips');
                    } else {
                        alert('保存失败，请重新保存');
                    }
                });
            }
        });

        //上传图片
        $('.mp-intro-input-button').click(function () {
            $('.mp-intro-imageupload .mp-input-hidden').trigger('click');
        });
        //input或者textarea字数监听
        $('.mp-intro-input-limit').focus(function (event) {
            var $that = $(this);
            var limit = parseInt($that.parent().find('span[type=\'length-limit\']').html());
            $(document).keydown(function (event) {
                if ( (event.keyCode == 88) || 
                     (event.keyCode == 86) ||
                     (event.keyCode == 8)) {
                    setTimeout(function () {
                        refreshStringLen($that.text());
                    }, 500);
                }
                checkData();
                refreshStringLen();
                if($that.val().length > limit) {
                    $that.val().length = limit;
                }
            });
        });
        $('.mp-intro-input-limit').blur(function () {
            checkData();
            refreshStringLen($(this).text());
        });

        //日期时间监听检查
        $('.mp-intro-time-container').change(function(event) {
            var timeArray = [];
            $(this).find('input').each(function(index, el) {
                timeArray.push($(this).val());
            });
            timeArray.push($(this).find('select').val());
            console.log(timeArray);
            var timeShow = timeArray[0] + ' - ' + timeArray[2] + timeArray[1];
            $(this).siblings().val(timeShow);
            var startTime = parseInt(timeArray[0].replace(/[\u4e00-\u9fa5]/gm, ''));
            var endTime = parseInt(timeArray[1].replace(/[\u4e00-\u9fa5]/gm, ''));

            if (startTime > endTime && !timeArray[2]) {
                switch ($(this).attr('data-type')) {
                    case 'open-time':
                        isOk.openTimeOk = 0;
                        break;
                    case 'best-time':
                        isOk.bestTimeOk = 0;
                        break;
                }
                
                isOk.info = '起始时间要晚于开始时间哦~';
                $(this).find('span').text(isOk.info);
            } else {
                switch ($(this).attr('data-type')) {
                    case 'open-time':
                        isOk.openTimeOk = 1;
                        break;
                    case 'best-time':
                        isOk.bestTimeOk = 1;
                        break;
                }
                $(this).find('span').text('');
            }
        });

        //日期时间选择
        $('#datetimepicker-open-starttime').datetimepicker({
            datepicker: false,
            format: 'H时i分'
        });
        $('#datetimepicker-open-endtime').datetimepicker({
            datepicker: false,
            format: 'H时i分'
        });
        $('#datetimepicker-best-starttime').datetimepicker({
            format: 'm月d日'
        });
        $('#datetimepicker-best-endtime').datetimepicker({
            format: 'm月d日'
        });
    }
    events();
    imgUpInit();

    
})