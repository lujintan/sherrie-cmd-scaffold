var option = {
    ele: '.mp-modules-page.gallery',

    init: function(argument) {
        return;
        lightapp.get('modules.gallery.source.customer.items', function(err, data) {
            window.lgmGalleryAll = window.lgmGalleryAll || {};
            var preloadImgs = [];
            /*var galleryData = data;*/
            if (data) {
                _.each(data, function(val, index) {
                    preloadImgs[index] = [];
                    window.lgmGalleryAll['gallery-' + index] = {
                        imgs: [],
                        title: val.name || ''
                    };
                    var images = [];
                    _.each(val.images, function(img) {
                        images.push(img.url);
                    });
                    utils.timg({
                        images: images,
                        callback: function(data) {
                            _.each(val.images, function(img, i) {
                                window.lgmGalleryAll['gallery-' + index].imgs.push({
                                    up_img: data[i],
                                    up_scale: 0,
                                    up_from: 'local',
                                    up_info: img.title || ''
                                });
                                // 只预加载前2张大图，图集展现后，bdyuntu.js会做后边图片的预加载
                                if (i < 2) {
                                    preloadImgs[index][i] = new Image();
                                    preloadImgs[index][i].src = data[i];
                                }
                            });

                            // 针对图集的奇葩需求：只有一个图集时直接展示图集。
                            /*if (galleryData.length === 1) {
                                $('.lgm-gallery').find('.lgm-gallery-items').trigger('click');
                            }*/
                        }
                    });
                });
            }
            utils.loadTimg("gallery");
        });
    },

    events: {}
};


module.exports = Ofa.Component(option);