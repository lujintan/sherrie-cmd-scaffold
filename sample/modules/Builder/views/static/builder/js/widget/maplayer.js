define(['widget/map', 'widget/dialog', 'template/maplayer', 'widget/citylist'], function(map, dialog, maplayerTpl, citylist) {

	var ZCITY = {
			131: "北京",
			332: "天津",
			289: "上海",
			132: "重庆",
			2911: "澳门特别行政区",
			2912: "香港特别行政区"
		},
		workCount = null,
		html = maplayerTpl.tpl,
		addressWidget,
		originalData = null,
		validate = function(value, result, name) {
			value = value || "";
			result.name = name;
			if (name == "regional") return true;
			if (_.isObject(value)) {
				if (_.keys(value).length == 0) {
					result.vtype = "required";
				}
			} else {
				var length = (value.replace(/[^\x00-\xff]/g, "c").length);
				if (length == 0) {
					result.vtype = "required"
				} else if (length > 200) {
					result.vtype = "max";
				}
			}
			result.invalid = !!result.vtype;
			return !result.invalid;
		},
		MaplayerModel = Backbone.Model.extend({
			defaults: {
				province: "",
				city: "",
				regional: "",
				street: ""
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

		MaplayerView = Backbone.View.extend({
			events: {
				"change select": "updateModel",
				"change #mp-manage-maplayer-street": "updateModel",
				"click #mp-manage-maplayer-positionToMap": "positionToMap"
			},
			initialize: function(options) {
				var _opts = $.extend(true, {}, options),
					that = this;

				this.model = new MaplayerModel(_opts.data || {});
				this.model.originalData = $.extend(true, {}, _opts.data || {});
				this.dom = {};
				this.dom.provinceSelect = $("#mp-manage-maplayer-province");
				this.dom.citySelect = $("#mp-manage-maplayer-city");
				this.dom.regionalSelect = $("#mp-manage-maplayer-regional");
				this.dom.street = $("#mp-manage-maplayer-street");

				this.dom.validate = $("#mp-manage-maplayer-validate");

				this.initStatus();

				citylist.fetchCityData();

				this.what = {
					province: "",
					city: "",
					regional: "",
					street: ""
				};

				this.model.on("change", function() {
					that.updateUI();
				});
				this.model.on("validate", function(m, result) {
					var messagebox = that.dom.validate;

					if (result.invalid) {
						messagebox.show();
						if (result.vtype == "required") {
							messagebox.text("此项不能为空");
						} else if (result.vtype == "max") {
							messagebox.text("此项不能超过200字");
						}
					} else {
						messagebox.hide();
					}
				})
			},
			updateModel: function(e) {
				var target = $(e.target),
					name = target.data("name"),
					value = target.val() || "",
					arr = value.split("_");

				this.model.set(name, value, {
					silent: true,
					validate:true,
					name:name
				});
				if (name == "street") {
					this.what[name] = value;
				} else {

					if (value == "") {
						this.resetSelect(name);
					} else {
						var cid = arr[0],
							cname = arr[1];
						this.what[name] = cname;

						if (name == "province" && ZCITY[cid]) {
							var content = {
								area_type: 1,
								sub: [{
									area_name: cname,
									area_code: cid
								}]
							}

							this.renderSelect(content);
						} else {
							name != "regional" && cid && citylist.fetchCityData({
								areacode: cid
							});
						}

					}
				}
			},

			resetSelect: function(name) {
				var dom = this.dom;
				switch (name) {
					case "province":
						dom.citySelect.val("").change();
						break;
					case "city":
						dom.regionalSelect.val("").change();
				}
			},

			updateUI: function() {
				var model = this.model,
					province = model.get("province"),
					dom = this.dom;
				dom.street.val(model.get("street") || "");

				if (province == "") {
					dom.provinceSelect.val("");
					dom.citySelect.val("");
					dom.regionalSelect.val("");
				} else {
					dom.provinceSelect.val(model.get("province") || "").change();
				}
				workCount&&workCount.initCount(this.el);
			},
			initStatus: function() {
				var that = this;
				window.BuilderEvent.addEventListener("citylist", function(data) {
					var status = data.result,
						content = data.content;
					if (status.error == 0) {
						that.renderSelect(content);
					} else {
						console.log(status);
					}
				});

				this.dom.street.html(this.model.get("street"));
				this.initCount();
			},
			initCount: function() {
				var el = this.el;
				require(['extensions/count'], function(count) {
					workCount = count;
					count.init(el);
				})
			},
			renderSelect: function(content) {
				var dom = this.dom,
					type = content.area_type,
					data = content.sub || [],
					select, options = [],
					first = "",
					name = "",
					value = "",
					selected = false,
					model = this.model;
				switch (type) {
					case 0:
						select = dom.provinceSelect;
						first = '<option value="">省份</option>';
						break;
					case 1:
						select = dom.citySelect;
						first = '<option value="">城市</option>';
						break;
					case 2:
						select = dom.regionalSelect;
						first = '<option value="">区域</option>';
						break;
				}
				options.push(first);
				select.empty();

				name = select.data("name");
				value = model.get(name);
				$.each(data, function(i, v) {
					var optionValue = v.area_code + "_" + v.area_name;
					if (value == optionValue) selected = true;
					option = '<option value="' + optionValue + '">' + v.area_name + '</option>';
					options.push(option);
				});

				select.html(options);

				if (selected) {
					select.val(value).change()
				} else {
					select.val("").change()
				}
			},

			saveData: function() {
				var model = this.model,
					data = model.toJSON();

				if (model.isValid()) {
					model.originalData = $.extend(true, {}, data);
					this.dom.validate.hide();
					return true
				} else {
					return false;
				}
			},

			getData: function() {
				return this.model.toJSON();
			},

			positionToMap: function() {
				if (this.model.isValid()) {
					var what = this.what,
						province = what.province,
						city = what.city,
						regional = what.regional,
						street = this.model.get("street");
					map.fixAddressToMap(province + city + regional + street, city || "中国");
				}
			},

			reset: function() {
				var data = this.model.originalData || {},
					dom = this.dom;

				if (data.province) {
					this.model.set(data);
				} else {
					this.model.set({
						province: "",
						city: "",
						regional: ""
					});
				}
			}

		});

	function init(options) {
		var data = options && options.data,
			point = data && data.point,
			okCallback = options.okCallback,
			address = data && data.address;

		return new dialog({
			content: $(html),
			title: "标记到地图",
			isShow: false,
			cb: function(contentPanel) {
				map.createMap(point || {});
				addressWidget = new MaplayerView({
					data: address,
					el: contentPanel
				});

				this.ok = function() {
					var close = true;
					if (addressWidget.saveData()) {
						var tourAddress = {
							address: addressWidget.getData(),
							point: map.getPoint()
						};

						okCallback(tourAddress);
						close = true;
					} else {
						close = false;
					}

					return close;
				};
				this.cancel = function() {
					map.reset();
					addressWidget.reset();
				}
			}
		});
	}

	return {
		getMapPlayer: init
	}

})