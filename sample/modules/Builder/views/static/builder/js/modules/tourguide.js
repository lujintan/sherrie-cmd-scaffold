define([
        'jquery',
        'extensions/fileupload',
        'lightapp'
    ], function (jquery, fileupload) {
    var tourguide = {
        image: ''
    }
    var imgUpload = fileupload();

    function pageInit() {
        lightapp.get('modules.tourguide', function (err, val) {
            if(err === null && val){
                var img = new Image();
                img.src = val.image;
                tourguide.image = val.image;
                var timeT = '';
                timeT = setInterval(function () {
                    if (img.complete) {
                        $('#zz_img_test').attr('src', val.image);
                        clearInterval(timeT);
                    }
                }, 1000)
            } else if (err === null) {
            } else {
                console.log('get modules.inroduce error: ' + err);
            }
        });
        $('.mp-tour-imageupload .mp-tour-input-right em').html('');
    }

    function imgUpInit() {
        var container = $('.mp-tour-imageupload'), 
            imgPreview = container.find('div[type=\'image-show\']'), 
            fileInput = $('input[name=mp-tour-image]');
        new imgUpload({
            el: fileInput,
            fileTypes: ['jpg', 'png', 'gif', 'jpeg', 'bmp'],
            type: 'POST',
            success: function (file, res) {
                console.log('图片upload success 图片地址: ' + res.url);
                tourguide.image = res.url;
                $('#zz_img_test').attr('src', res.url);
            },
            error: function (file, res) {
                console.log('upload error : ' + res);
                if (res == 'TYPE_ERROR') {
                    $('.mp-tour-imageupload .mp-tour-input-right em').html('格式不对');
                }
            }
        })
    }
    var events = function () {
        $('.mp-tour-input-button').click(function () {
            $('.mp-tour-imageupload .mp-tour-input-right em').html('');
            $('.mp-tour-imageupload .mp-input-hidden').trigger('click');
        });
        $('.mp-tour-submit').click(function () {
            //是否上传图片额外判断
            if ($('.mp-tour-image-show').css('background-image') !== "none") {
                $('.mp-tour-image-show').removeClass('mp-tour-input');
            } else {
                $('.mp-tour-imageupload img').addClass('mp-tour-input');
            }
            if ($('.mp-tour-container div').has('.mp-tour-input').length){
            } else {
                console.log('OK,可以保存了');
                lightapp.set('modules.tourguide', tourguide, function (err, val) {
                    if (err === null){
                        window.BuilderEvent.fire('modulesave');
                        window.BuilderEvent.fire("modulepreview", "tourguide", true);
                        $('.mp-manage-moduleitem li[data-module=tourguide]')
                            .removeClass('mp-manage-errortips');
                    } else {
                        alert('保存失败，请重新保存');
                    }
                });
            }
        });
        $('.mp-manage-moduleitem li').click(function () {
            var dataModule = $(this).attr('data-module');
            var oClass = $(this).attr('class');
            if (dataModule === 'tourguide' && !oClass) {
                pageInit();
            }
        });
    }
    pageInit();
    events();
    imgUpInit();
})