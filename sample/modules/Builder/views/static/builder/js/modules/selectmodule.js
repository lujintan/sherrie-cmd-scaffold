define(['extensions/lightapi', 'page/config', 'modules/imgupload', 'widget/iconupload', 'jquery', 'backbone'], function(lightapi, pageconfig, imgupload, iconupload) {
	var tpl = '<li id="cb_<%=cid%>"><%=text%><a href="javascript:void(0)" node-type="removeModule" data-cid="<%=cid%>" class="mp-manage-delete"></a></li>',
		modulesConfig = pageconfig.modulesConfig,
		ManageModel = Backbone.Model.extend({
			defaults: {
				text: '',
				image: null,
				action: {
					type: 'module', // module, innerLink,
					value: ''
				}
			}
		}),

		ManageCollection = Backbone.Collection.extend({
			model: ManageModel
		}),

		ManageView = Backbone.View.extend({
			events: {
				'click button[node-type="submit"]': 'saveModules',
				'click a[node-type="removeModule"]': 'removeModuleHandler',
				'click div[node-type="checkbox"]': 'selectModuleHandler'
			},
			initialize: function(config) {
				var _conf = $.extend(true, {}, config),
					el = $(this.el);

				this.data = _conf.data;
				this.navs = null;
				this.updateNavbox = false;

				this.dom = {};
				this.dom.requiredContainer = el.find('[node-id="required"]');
				this.dom.selectbox = el.find('[node-id="selectbox"]');
				this.dom.navsuploadContainer = $("#mp-manage-navbgbox");
				this.dom.navUploadBox = $("#mp-manage-navupload");

				this.createNavsCollection();
				this.render();
			},

			createNavsCollection: function() {
				var navs = this.data.navs || [],
					that = this;

				this.navs = new ManageCollection(navs);

				this.navs.on("remove", function(model) {
					that.removeModule(model);
				})

				this.navs.on("add", function(model) {
					that.addModule(model);
				})
			},

			removeModule: function(nav) {
				var cid = nav.cid,
					action = nav.get("action") || {},
					name = nav.name || action.value,
					selectbox = this.dom.selectbox;;

				$("#cb_" + cid).remove();
				selectbox.find("div[data-name=" + name + "]").removeClass("checked");
				nav.destroy();
			},

			addModule: function(nav) {
				var template = _.template(tpl),
					action = nav.get("action") || {},
					name = nav.get("name") || action.value,
					html = template({
						cid: nav.cid,
						text: nav.get("text")
					}),
					selectbox = this.dom.selectbox,
					container = this.dom.navUploadBox;

				this.dom.requiredContainer.append(html);
				selectbox.find("div[data-name=" + name + "]").addClass("checked");

				this.updateNavbox && new iconupload({
					model: nav,
					container: container
				});
			},

			render: function() {
				var data = this.data;

				this.initSelectStatus();
				this.renderSelectModules();

				this.imgupload = imgupload.getImgupload({
					data: data.style
				});

				this.renderNavUpload();
			},

			renderNavUpload: function() {
				var navs = this.navs,
					that = this,
					dom = this.dom,
					tplName = pageconfig.tplName;

				if (pageconfig.navconfig[tplName]) {
					that.updateNavbox = true;
					dom.navsuploadContainer.show();
					navs.each(function(nav) {
						new iconupload({
							model: nav,
							container: dom.navUploadBox
						});
					});
				}
			},

			initSelectStatus: function() {
				var navs = this.navs,
					selectbox = this.dom.selectbox;

				navs.each(function(nav) {
					var action = nav.get("action"),
						name = nav.get("name") || action.value;
					selectbox.find("div[data-name=" + name + "]").addClass("checked")
				});
			},
			removeModuleHandler: function(e) {
				var target = $(e.target),
					cid = target.data("cid");
				this.navs.remove(cid);
			},
			renderSelectModules: function() {
				var data = this.data,
					template = _.template(tpl),
					html = "",
					required = modulesConfig.required;

				this.navs.each(function(nav) {
					var action = nav.get("action") || {},
						name = nav.get("name") || action.value; //兼容以前老数据 无 name 的情形 此处逻辑点问题

					if (!required[name]) {
						html += template({
							cid: nav.cid,
							text: nav.get("text")
						});
					}
				})

				html && this.dom.requiredContainer.append(html);
			},

			saveModules: function() {
				var navs = [],
					backgroundImg = this.imgupload.model.get("backgroundImg"),
					orderconfig = modulesConfig.order;

				navs = this.navs.toJSON();

				navs.sort(function(a, b) {
					var aName = a.name || a.action.value,
						bName = b.name || b.action.value;
					if (orderconfig[aName] > orderconfig[bName]) {
						return 1;
					}
					if (a.order < b.order) {
						return -1;
					}
				});

				lightapi.get("index", function(err, res) {
					res = res || {};
					if (err) {
						console.log(err);
					} else {
						var style = res.style || {};
						style.backgroundImg = backgroundImg;

						res.navs = navs;

						lightapi.set("index", res, function(err) {
							if (err === null) {
								window.BuilderEvent.fire("moduleschange", navs);
								window.BuilderEvent.fire("modulepreview", "cover");
							} else {
								console.log(err);
							}
						})
					}
				})
			},
			selectModuleHandler: function(e) {
				var target = $(e.target),
					model = null,
					name = target.data("name"),
					text = target.data("text");

				if (target.hasClass("checked")) {
					this.navs.each(function(nav) {
						var action = nav.get("action") || {},
							navname = nav.name || action.value;
						if (navname == name) {
							model = nav;
							return false;
						}
					});

					model && this.navs.remove(model);
				} else {
					var data = {
						text: text,
						name: name,
						action: {
							value: name,
							type:"module"
						}
					};

					model = new ManageModel(data);
					this.navs.add(model);
				}
			}
		});

	lightapp.get("index", function(err, index) {
		if (err == null) {
			index = index || {};

			var navs = index.navs || [];

			new ManageView({
				el: $(".mp-manage-cover"),
				data: index
			})
		} else {
			console.log(err);
		}
	});
})