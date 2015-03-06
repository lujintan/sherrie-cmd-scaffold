define(['jquery', 'page/config', 'widget/dialog'], function(jquery, config, dialog) {
    var getUniqueKey = function(name) {
        var key = +new Date() + '-' + Math.floor(Math.random() * (99999 - 1 + 1));
        return ((name) ? name + '-' : '') + key;
    };

    return function() {
        var FileUpload = function(opts) {
            //上传文件的DOM元素
            this.el = opts.el;
            //处理上传文件路径
            this.url = opts.url || config.uploadurl;
            //上传类型
            this.type = opts.type || 'PUT';
            //是否允许裁剪
            this.cancut = false; //opts.cancut || false;

            this.aspectRatio = opts.aspectRatio || "auto";
            //允许上传文件类型,数组
            this.fileTypes = opts.fileTypes;
            //文件上传成功
            this.success = opts.success;
            //文件上传失败  
            this.error = opts.error;
            //文件最大值,单位为M
            this.maxSize = opts.maxSize;
            //是否覆盖原文件
            this.overwrite = opts.overwrite;
            //事件处理
            this.Event = {};

            //上传失败尝试次数
            this.trycount = 0;

            this._initEvents(opts);

        };

        FileUpload.prototype = {
            _initEvents: function(opts) {
                var that = this,
                    events = ['start', 'success', 'error'];

                this.el.on('change', function() {
                    if (!this.files[0]) {
                        return;
                    }
                    if (opts.beforeChange) {
                        if (!opts.beforeChange()) {
                            return;
                        }
                    }
                    that._handlerFile(this.files[0]);
                });

                $.each(events, function(i, v) {
                    that.Event[v] = $.Callbacks();
                });

                if (that.start && typeof(that.start)) {
                    that.Event['start'].add(function(args, data) {
                        that.start(args, data);
                    })
                }

                if (that.success && typeof(that.success)) {
                    that.Event['success'].add(function(args, data) {
                        that.success(args, data);
                    })
                }

                if (that.error && typeof(that.error)) {
                    that.Event['error'].add(function(file, data) {
                        that.error(file, data);
                    })
                }
            },

            trigger: function(state, file, data) {
                var Event = this.Event;

                if (Event[state]) {
                    Event[state].fire(file, data);
                } else {
                    console.log("error state : " + state);
                }
            },

            _handlerFile: function(file) {
                var that = this,
                    bFileType = false;
                //判断文件类型
                if (this.fileTypes && this.fileTypes.length) {
                    for (var i = 0; i < this.fileTypes.length; i++) {
                        var value = this.fileTypes[i];
                        var re = new RegExp(value + '$', 'ig');
                        if (re.test(file.name)) {
                            bFileType = true;
                        }
                    }
                    if (!bFileType) {
                        that.trigger('error', file, 'TYPE_ERROR');
                        return;
                    }
                }
                if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
                    that.trigger('error', file, 'SIZE_ERROR');
                    return;
                }
                //这里用FormData来处理文件
                this.el.val("");
                if (this.cancut) {
                    this.cutupload(file);
                } else {
                    if (!!window.FormData) {
                        var formData = new FormData();
                        formData.append('file', file);
                        this.upload(formData, file, true);
                    }
                }
            },

            cutupload: function(file) {
                var that = this,
                    image = null,
                    container = null,
                    src = window.URL.createObjectURL(file);

                if (this.image) {
                    var image = this.image;

                    that.dialog.show();
                    image.cropper("replace", src);
                    setTimeout(function() {
                        that.dialog.fresh();
                    }, 100)
                } else {
                    image = this.image = $('<img class="mp-manage-cutuploadimg"/>');
                    container = $('<div class="mp-manage-cutuploadimg"></div>');
                    image.attr("src", src);
                    container.append(image);

                    setTimeout(function() {
                        that.dialog = new dialog({
                            title: "图片上传",
                            content: container,
                            cb: function() {

                                require(['lib/cropper'], function() {
                                    image.cropper({
                                        zoomable: false,
                                        aspectRatio: that.aspectRatio
                                    });
                                })
                            },
                            ok: function() {
                                var formData = {
                                        "base64": true
                                    },
                                    image = that.image,
                                    imageData = image.cropper("getDataURL");
                                imageData = imageData.replace(/^data:image\/(png|jpg);base64,/ig, "");
                                formData.imagedata = imageData;
                                formData.imagetype = file.type;
                                that.upload(formData, file);
                            }
                        });

                    }, 100)
                }
            },

            upload: function(formdata, file, fileuplad) {
                var that = this,
                    config = {
                        url: that.url,
                        type: that.type,
                        dataType: 'json',
                        success: function(res) {
                            if (res && res.code == 0) {
                                that.trigger('success', file, res);
                            } else {
                                that.trigger('error', file, res);
                            }
                        },
                        error: function(res) {
                            if (that.trycount < 5) {
                                that.trycount++;
                                that.upload(formdata, file, fileuplad);
                                console.log("尝试次数：" + that.trycount);
                            } else {
                                that.trycount = 0;
                                that.trigger('error', file, res);
                                formdata = null;
                            }

                        },
                        data: formdata
                    };

                if (fileuplad) {
                    config.processData = false;
                    config.contentType = false;
                }
                this.trigger("start");
                $.ajax(config);
            }
        }
        return FileUpload;
    }
});