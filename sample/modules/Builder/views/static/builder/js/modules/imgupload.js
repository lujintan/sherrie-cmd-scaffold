define(['backbone', 'jquery', 'extensions/fileupload', 'extensions/lightapi', 'page/config'], function(backbone, jquery, fileupload, lightapi, pageconfig) {
	var Fileupload = fileupload(),
		DEFAULTIMGURL = "/static/mobile/image/XX/bg.jpg",
		ImgUplodModel = backbone.Model.extend({
			defaults: {
				backgroundImg: null
			}
		}),
		ImgUplodView = backbone.View.extend({
			events: {
				'click div[node-type="uploadcontainer"]': "uploadImg",
				'click a[node-type=defaultimg]': "applyDefaultImg"
			},

			initialize: function(options) {
				var data = options.data,
					that = this;
				this.model = new ImgUplodModel(data);

				this.dom = {};

				this.dom.fileInput = $(this.el).find("input[node-id=fileinput]");
				this.dom.uploadcontainer = $(this.el).find("div[node-type=uploadcontainer]");
				this.dom.previewImage = $(this.el).find("img[node-type=previewimage]");
				this.initUploadWidget();

				this.renderImg();

				this.model.on("change:backgroundImg", function(data, url) {
					that.previewImg(url);
				})
			},

			renderImg: function() {
				var imgUrl = this.model.get("backgroundImg"),
					that = this;
				if (imgUrl == "") {

					that.previewImg(DEFAULTIMGURL.replace("XX", pageconfig.tplName));
				} else {
					this.previewImg(imgUrl);
				}
			},

			uploadImg: function() {
				this.dom.fileInput.trigger("click");
			},

			initUploadWidget: function() {
				var that = this,
					fileInput = this.dom.fileInput;
				this.fileupload = new Fileupload({
					el: fileInput,
					maxSize: 0.48,
					cancut:true,
					aspectRatio:9/16,
					fileTypes: ['jpg', "png", "gif"],
					type: "POST",
					start: function() {

					},
					success: function(file, res) {
						that.model.set("backgroundImg", res.url);
						that.uploadSuccess();
					},
					error: function(file, res) {
						console.log("upload error : " + res);
						that.uploadError();
					}
				});
			},

			uploadSuccess: function() {

			},

			uploadError: function() {

			},

			applyDefaultImg: function() {
				var that = this;
				lightapi.get("index.tpl", function(err, res) {
					if (err == null) {
						that.model.set("backgroundImg", "");
						that.renderImg();
					}
				})

			},

			previewImg: function(imgurl) {
				var dom = this.dom;
				dom.previewImage.attr('src', imgurl);
				if (imgurl) {
					dom.uploadcontainer.addClass("mp-manage-imgupload-active");
				} else {
					dom.uploadcontainer.removeClass("mp-manage-imgupload-active");
				}
			},
			getData: function() {
				return this.model.toJSON();
			}
		});


	function init(options) {
		return new ImgUplodView({
			el: $(".mp-manage-uploadbox"),
			data: options.data || {}
		})
	}

	return {
		getImgupload: init
	}
})