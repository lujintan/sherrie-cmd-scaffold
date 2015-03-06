define(['backbone', 'extensions/lightapi', 'template/atlastpl', 'extensions/fileupload', 'widget/confirm', 'extensions/count', 'underscore', 'jquery'], function(backbone, lightapi, atlastpl, fileupload, confirm, wordCount) {

	var max = {
			name: 50,
			image: 2000,
			brief: 100,
			introduce: 2000
		},
		validate = function(value, result, name) {
			value = value || "";
			result.name = name;
			if (_.isObject(value)) {
				if (_.keys(value).length == 0) {
					result.vtype = "required";
				}
			} else {
				var length = ($.trim(value).replace(/[^\x00-\xff]/g, "c").length);
				if (length == 0) {
					result.vtype = "required"
				} else if (length > max[name]) {
					result.vtype = "max";
					result.max = max[name];
				}
			}
			result.invalid = !!result.vtype;
			return !result.invalid;
		},
		Fileupload = fileupload(),
		AtlasModel = backbone.Model.extend({
			defaults: {
				name: "",
				image: "",
				brief: "",
				introduce: ""
			},
			validate: function(attrs, options) {
				var result = {
						invalid: false
					},
					that = this;
				name = options.name || "";
				if (name) {
					validate(attrs[name], result, name);
					this.trigger("validate", this, result);
				} else {
					$.each(attrs, function(key, value) {
						return validate(value, result, key);
					});
					this.trigger("validate", this, result);
					return result.invalid;
				}
			}
		}),

		AtlasCollectoin = backbone.Collection.extend({
			model: AtlasModel
		}),

		AtlasView = backbone.View.extend({
			events: {
				'click button[node-type="uploadbtn"]': "uploadImgHandler",
				'click a[node-type="addAtlas"]': "addAtlasHandler",
				'click button[node-id=spot_submit]': "saveAtlasHandler",
				'click a[node-type="atlasEdit"]': "editAtlasHandler",
				'click a[node-type="atlasDelete"]': "deleteAtlasHandler",
				'change input[name]': "inputChange",
				'change textarea[name]': "inputChange"
			},

			initialize: function() {
				var that = this,
					el = $(this.el);
				this.model = new AtlasModel();

				this.maxImage = 10;
				this.deleteModelId = null;

				this.dom = {};
				this.dom.addAtlasBtn = el.find('[node-id="addAtlas"]');

				this.dom.atlasForm = el.find('[node-id="atlasform"]');
				this.dom.atlasList = el.find('[node-id="atlasList"]');
				this.dom.brief = el.find('[node-id="brief"]');
				this.dom.introduce = el.find('[node-id="introduce"]');
				this.dom.uploadImages = el.find('[node-id="uploadimages"]');
				this.dom.imgTitle = el.find('[node-id="atlasTitle"]');
				this.dom.atlasupload = el.find('[node-id="atlasupload"]');
				this.dom.atlasNameLabel = el.find('[node-id="atlasname"]');

				this.addCollection = new AtlasCollectoin();

				this.collection.on("add", function(model, collection, action) {
					that.updageCollection(model, collection, action);
				});

				this.collection.on("remove", function(model, collection, action) {
					that.updageCollection(model, collection, action);
				});

				this.collection.on("change", function(model, collection, action) {
					that.updageCollection();
				});

				this.model.on("change", function(data, data2) {
					that.changeModel();
				});

				this.model.on("validate", function(model, result) {
					var name = result.name,
						valiateMsg = $(that.el).find("[name=" + name + "]").siblings(".tips-msg"),
						inputbox = valiateMsg.parent();
					if (result.invalid) {
						inputbox.addClass("input-error");
						if (result.vtype == "required") {
							valiateMsg.text("此项不能为空");
						} else if (result.vtype == "max") {
							valiateMsg.text("此项最多为" + result.max + "个字符");
						}
					} else {
						inputbox.removeClass("input-error");
					}
				})

				this.render();

				this.initFileuploadWidget();

				var collection = this.collection;
				collection.length && this.resetModel(collection.at(0));

				this.initCount();
				this.bindEvent();
			},

			bindEvent: function() {
				var that = this;
				window.BuilderEvent && window.BuilderEvent.addEventListener("publish", function() {
					that.saveAtlasHandler();
				});
			},

			initCount: function() {
				var el = this.el;
				wordCount.init(el);
			},

			previewImages: function(url) {
				var uploadImages = this.dom.uploadImages,
					imgHTML = '<div class="mp-manage-uploadimgbox ">' +
					'<div class="imgbox"><img src="XX"></div>' +
					'</div>';
				if (url) {
					uploadImages.html(imgHTML.replace(/XX/ig, url));
				} else {
					uploadImages.html("");
				}
			},

			uploadImgHandler: function() {
				var dom = this.dom;

				dom.atlasupload.trigger("click");
			},

			initFileuploadWidget: function() {
				var that = this,
					fileInput = this.dom.atlasupload;

				this.fileupload = new Fileupload({
					el: fileInput,
					maxSize: 0.48,
					fileTypes: ['jpg', "png", "gif", "bmp", "jpeg"],
					type: "POST",
					success: function(file, image) {
						that.uploadSuccess(image);
					},
					error: function(file, res) {
						that.uploadError(res);
					}
				})
			},

			uploadSuccess: function(image) {
				if (image) {
					this.model.set("image", image.url, {
						name: "image",
						validate: true,
						silent: true
					})
					this.previewImages(image.url);
					this.$el.find("[name=image]").siblings(".tips-msg").hide();
				}
			},

			uploadError: function(res) {
				var msg = "";

				if (res == "TYPE_ERROR") {
					msg = "文件格式不对";
				} else if (res == "SIZE_ERROR") {
					msg = "文件过大，不能超过500K";
				} else {
					msg = "上传出错了，请重新上传";
				}

				this.$el.find("[name=image]").siblings(".tips-msg").show().html(msg);
			},

			render: function() {
				var data = this.collection;
				this.renderAtlases(data);
			},

			changeModel: function() {
				var dom = this.dom,
					data = this.model.toJSON();

				dom.imgTitle.val(data.name || "");
				dom.brief.val(data.brief || "");
				dom.introduce.val(data.introduce || "");

				this.previewImages(data.image);

				this.initCount();
			},

			inputChange: function(e) {
				var target = $(e.target),
					key = target.attr("name"),
					value = target.val();
				this.model.set(key, value, {
					silent: true,
					validate: true,
					name: key
				});
			},


			addAtlasHandler: function() {
				var model = new AtlasModel(),
					length = this.collection.length;

				model.set("name", "热门景点" + (length + 1));
				this.checkeChanged(model);
			},

			checkeChanged: function(model) {
				var m = this.model,
					originalData = m.originalData,
					isChangeed = originalData && m.changedAttributes(originalData),
					that = this;
				if (isChangeed) {
					var content = '<div class="mp-manage-gallery-atlasTip">' +
						'<div class="title">确认添加？</div>' +
						'<div class="info">当前景点内容已经被修改，还没保存</div>' +
						'</div>';
					confirm("", content, function(flag) {
						if (flag) {
							var atlases = that.collection.clone();
							atlases.add(model)
							that.renderAtlases(atlases)
							that.resetModel(model);
							that.addCollection.add(model);
						}
					});
				} else {
					var atlases = that.collection.clone();
					atlases.add(model)
					that.renderAtlases(atlases);
					this.resetModel(model);
					that.addCollection.add(model);
				}
			},

			editAtlasHandler: function(e) {
				var target = $(e.target),
					cid = target.data("cid"),
					collection = this.collection,
					addCollection = this.addCollection,
					model = collection.get(cid) || addCollection.get(cid);
				this.resetModel(model);
			},


			resetModel: function(m) {
				var model = this.model,
					data = m.toJSON(),
					index = this.collection.indexOf(m);

				model.set(data);
				model.cid = m.cid;
				model.originalData = $.extend(true, {}, data);
				this.showAtlasForm();

				if (index == -1) {
					index = this.collection.length;
				}

				this.dom.atlasNameLabel.html("热门景点" + (index + 1));
			},

			deleteAtlasHandler: function(e) {
				var that = this,
					target = $(e.target),
					cid = target.data("cid");
				that.deleteAtlas(cid);
			},

			deleteAtlas: function(cid) {
				var collection = this.collection,
					content = '<div class="mp-manage-gallery-atlasTip">' +
					'<div class="title">确认删除？</div>' +
					'<div class="info">删除后将不可恢复</div>' +
					'</div>',
					ccid = this.model.cid
				that = this;
				confirm("", content, function(flag) {

					if (flag) {
						if (collection.remove(cid)) {
							if (cid == ccid) {
								that.closeAtlasForm();
							}
						} else {
							$("#cid_" + cid).remove(); //删除添加未保存的spot
							that.closeAtlasForm();
						}

					}

				});
			},

			saveAtlasHandler: function() {

				if (this.model.isValid()) {
					$(".active").removeClass("mp-manage-errortips");
					var data = this.model.toJSON(),
						cid = this.model.cid,
						omodel = this.collection.get(cid);

					if (omodel) {
						omodel.set(data);
					} else {
						this.collection.add([data]);
					}

					this.model.originalData = $.extend(true, {}, data);;

					this.closeAtlasForm(true);
				} else {
					$(".active").addClass("mp-manage-errortips");
				}

			},

			updageCollection: function(model, collection, action) {
				var that = this;

				this.renderAtlases(this.collection);
				lightapi.set("modules.spotlist.source.customer", {
					items: this.collection.toJSON()
				}, function(err) {
					if (err == null) {
						action && action.add && that.addCollection.remove(model.cid);

						//保证关闭动画的流畅执行
						setTimeout(function() {
							window.BuilderEvent && window.BuilderEvent.fire("modulepreview", "spotlist", true);
						}, 100);
					} else {
						console.log(err);
					}
				});
			},

			renderAtlases: function(collectionData) {
				var html = "",
					template = _.template(atlastpl.atlas),
					ccid = this.model.cid;

				collectionData.each(function(m, index) {
					var data = m.toJSON(),
						name = "图集" + (index + 1);
					data.cid = m.cid;
					data.name = data.name || name;
					data.classname = data.cid == ccid ? "active" : "";
					html += template(data);
				});
				this.dom.atlasList.html(html);
			},

			showAtlasForm: function() {
				var cid = this.model.cid,
					atlasList = this.dom.atlasList,
					el = $(this.el),
					editbtn = atlasList.find('a.editbutton[data-cid="' + cid + '"]');

				atlasList.find("li.active").removeClass("active");
				$("#cid_" + cid).addClass("active");
				el.find(".input-error").removeClass("input-error");
				this.dom.atlasForm.show();
			},

			closeAtlasForm: function(animation) {
				var cid = this.model.cid,
					editbtn = this.dom.atlasList.find('a.editbutton[data-cid="' + cid + '"]');

				$("#cid_" + cid).removeClass("active");
				if (animation) {
					try {
						this.animation(cid);
					} catch (e) {
						this.dom.atlasForm.hide();
					}
				} else {
					this.dom.atlasForm.hide();
				}
			},

			animation: function(cid) {
				var atlasForm = this.dom.atlasForm,
					target = $("#cid_" + cid),
					targetOffset = target.offset() || this.dom.addAtlasBtn.offset(),
					formOffset = atlasForm.offset(),
					stepx = (formOffset.left - targetOffset.left + atlasForm.width() / 2 - 50) / 50,
					stepy = (formOffset.top - targetOffset.top + atlasForm.height() / 2) / 50,
					timer = null,
					deg = 0,
					left = formOffset.left,
					top = formOffset.top,
					scale = 0.5,
					that = this;

				timer = setInterval(function() {
					deg = deg + 50;
					left = left - stepx;
					top = top - stepy;
					scale = scale - 0.01;
					var d = "scale(" + scale + ", " + scale + ")";

					if (scale < 0) {
						clearInterval(timer);
						atlasForm.css({
							position: "static",
							transform: "",
							display: "none"
						})
					} else {
						atlasForm.css({
							transform: d,
							position: "absolute",
							left: left + "px",
							top: top + "px"
						})

					}

				});
			}
		});

	return {
		getAtlasInstance: function(config) {

			return new AtlasView({
				collection: new AtlasCollectoin(config.data && config.data.items || []),
				el: config.container
			});

		}
	}

})