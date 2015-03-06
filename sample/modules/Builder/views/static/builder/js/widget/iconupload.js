define(['extensions/fileupload', 'template/icontpl', 'extensions/lightapi', 'page/config', 'jquery', 'backbone'], function(fileupload, icontpl, lightapi, pageconfig) {
	var Fileupload = fileupload(),
		DEFAULTIMGURL = "/static/mobile/image/XX/GG.jpg",
		ImgUplodView = Backbone.View.extend({
			events: {
				'click div[node-type="uploadcontainer"]': "uploadImg",
				'click a[node-type=defaultimg]': "applyDefaultImg"
			},

			initialize: function(options) {
				var container = options.container,
					el = null,
					that = this;


				this.renderUI(container);
				this.dom = {};

				el = this.$el;
				this.dom.fileInput = el.find('input[node-id="fileinput"]');
				this.dom.uploadcontainer = el.find("div[node-type=uploadcontainer]");
				this.dom.previewImage = el.find("img[node-type=previewimage]");

				this.initUploadWidget();

				this.model.on("change:image", function(data, url) {
					that.previewImg(url);
				});

				this.model.on("destroy", function() {
					that.destroy();
				});

				this.renderImg();
			},

			renderUI: function(container) {
				var model = this.model,
					template = _.template(icontpl.tpl),
					imgUrl = this.model.get("image"),
					html;

				html = template({
					cid: model.cid,
					text: model.get("text"),
					url: model.get("image")
				});

				var el = $(html)
				container.append(el);
				this.setElement(el);
			},

			renderImg: function(argument) {
				var imgUrl = this.model.get("image");
				imgUrl == "" && this.fetchDefaultImgUrl();
			},

			fetchDefaultImgUrl: function() {
				var model = this.model,
					action = model.get("action") || {},
					name = model.get("name") || action.value,
					index = pageconfig['modulesConfig']["order"][name] || 0,
					imgname = "menu_bg_" + (index + 1);


				var url = DEFAULTIMGURL.replace("XX", pageconfig.tplName || "").replace(/GG/ig, imgname);
				this.previewImg(url);
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
					fileTypes: ['jpg', "png", "gif", "bmp", "jpeg"],
					type: "POST",
					start: function() {

					},
					success: function(file, res) {
						that.model.set("image", res.url);
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
				var model = this.model;

				this.model.set("image", "");
				this.fetchDefaultImgUrl();
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
			destroy: function() {
				this.$el.remove();
				this.model = null;
				this.$el = null;
			}
		});


	return ImgUplodView;
})