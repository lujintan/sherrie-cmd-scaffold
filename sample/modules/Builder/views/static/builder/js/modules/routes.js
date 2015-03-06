define(['extensions/lightapi', 'backbone', 'jquery'], function(lightapi, backbone) {

	var validate = function(value, result, name) {
			value = value || "";
			result.name = name;
			if (_.isObject(value)) {
				if (_.keys(value).length == 0) {
					result.vtype = "required";
				}
			} else {
				var length = (value.replace(/[^\x00-\xff]/g, "c").length);
				if (length == 0) {
					result.vtype = "required"
				} else if (length > 2000) {
					result.vtype = "max";
				}
			}
			result.invalid = !!result.vtype;
			return !result.invalid;
		},

		RouteMode = backbone.Model.extend({
			defaults: {
				outerTraffic: "", //外部交通
				innerTraffic: "", //内部交通
				tourAddress: {} // 景区位置
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
		});

	var RouteView = backbone.View.extend({
		events: {
			"change textarea.input": "changeHandler",
			"click #mp-manage-routes-mapBtn": "openMaplayer",
			"click button[node-type=submit]": "submitData"
		},
		initialize: function(config) {
			var _conf = $.extend(true, {}, config);
			this.initMode(_conf.data);

			this.render();
			this.initCount();
			this.bindEvent();
		},

		bindEvent:function(){
			var that = this;
			window.BuilderEvent && window.BuilderEvent.addEventListener("publish", function(){
				that.submitData();
			});
		},

		initCount: function() {
			var el = this.el;
			require(['extensions/count'], function(count) {
				count.init(el);
			})
		},

		initMode: function(data) {
			var that = this;
			that.model = new RouteMode(data);

			this.model.on("validate", function(model, result) {
				that.validate(result);
			})
		},

		validate: function(result) {
			var name = result.name,
				messagebox = $(this.el).find('[name=' + name + ']').siblings(".tips-msg"),
				inputbox = messagebox.parent();
			if (result.invalid) {
				if (result.vtype == "required") {
					messagebox.text("此项不能为空");
				} else if (result.vtype == "max") {
					messagebox.text("此项不能超过2000字");
				}
				inputbox.addClass("input-error");
			} else {
				inputbox.removeClass("input-error");
			}
		},

		render: function() {
			var data = this.model.toJSON();
			$.each(data || {}, function(name, value) {
				$("textarea[name='" + name + "']").val(value);
			})
		},

		changeHandler: function(e) {
			var input = $(e.target),
				name = input.attr("name"),
				value = input.val();
			console.log("model data changed");
			this.model.set(name, value, {
				validate: true,
				name: name,
			});

			console.log("model is changed :" + this.model.hasChanged());
		},
		submitData: function() {
			if (this.model.isValid()) {
				$(".active").removeClass("mp-manage-errortips");
				var data = this.model.toJSON();
				lightapi.setValue("modules", {
					routes: data
				}, function(err) {
					if (err == null) {
						window.BuilderEvent && window.BuilderEvent.fire("modulesave");
						window.BuilderEvent && window.BuilderEvent.fire("modulepreview", "routes", true);
					}
				})
			} else {
				$(".active").addClass("mp-manage-errortips");
			}
		},
		openMaplayer: function() {
			var that = this,
				dialog = this.dialog,
				model = this.model;
			if (dialog) {
				dialog.show();
			} else {
				require(["widget/maplayer"], function(layer) {
					that.mapLayer = layer;
					that.dialog = layer.getMapPlayer({
						data: model.get("tourAddress"),
						okCallback: function(data) {
							that.model.set("tourAddress", data, {
								validate: true,
								name: "tourAddress"
							});
						}
					});
				});

			}
		}
	});

	var routeView = null;

	function init() {
		window.BuilderEvent.addEventListener("moduleselect", function(moduleName) {
			if (moduleName && moduleName == "routes") {
				routeView == null && lightapi.get("modules.routes", function(err, res) {
					if (err == null) {
						res = res || {};
						routeView = new RouteView({
							data: res,
							el: $(".mp-manage-routes")
						});
					}
				})
			}
		})

	}

	init();
})