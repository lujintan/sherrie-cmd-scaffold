define(['jquery', 'backbone', 'widget/popinfo', 'lightapp'], function(jquery, backbone, popinfo) {

	var TabView = backbone.View.extend({
		el: "#mp-manage-manageTab",
		initialize: function() {
			var el = $(this.el);

			this.tickets

			this.modules = {
				introduce: true,
				tickets: true
			};
			this.dom = {};
			this.dom.moduleItems = el.find("li");
			this.dom.list = $("#mp-manage-moduleList");
			this.dom.ticketsBar = $("#mp-manage-ticketsbar");

			this.initTabs();
			this.bindEvent();
		},

		bindEvent: function() {
			var that = this;
			window.BuilderEvent.addEventListener("moduleschange", function(modules) {
				that.renderTabs(modules);
			});

			this.dom.ticketsBar.delegate("[node-type=goback]", "click", function() {
				window.BuilderEvent.fire("ticketlist", $(this));
			})

			window.addEventListener("message", function(event) {
				var msg = event.data;

				if (msg.action == "page_type") {
					if (msg.data == "list") {
						that.dom.ticketsBar.hide();
						that.$el.show();
					} else {
						that.$el.hide();
						that.dom.ticketsBar.show();
					}
				}

			}, false);
		},
		events: {
			"click li[data-module]": "clickHandler"
		},

		clickHandler: function(e) {
			var target = $(e.target),
				moduleName = target.data("module"),
				classname = target.attr("class") || "";

			if (classname.indexOf("disable") > -1) return;

			var current = $(this.el).find(".active"),
				currentModuleName = current.data("module");

			if (currentModuleName == moduleName) {
				return;
			}
			this.dom.moduleItems.removeClass("active");

			target.addClass("active");

			var app = this.dom.list.find("div[module=" + moduleName + "]");
			$(app).show().siblings().hide();
			window.BuilderEvent && window.BuilderEvent.fire("modulepreview", moduleName == "cover" ? "" : moduleName);
			window.BuilderEvent && window.BuilderEvent.fire("moduleselect", moduleName == "cover" ? "" : moduleName);
		},
		initTabs: function(moduleName) {
			var that = this;
			lightapp.get("index.navs", function(err, navs) {
				if (err == null) {
					navs = navs || [];


					that.renderTabs(navs);
				} else {
					console.log(err);
				}
			})
		},
		renderTabs: function(navs) {
			var lis = this.dom.moduleItems,
				container = $(this.el),
				modules = this.modules;

			$.each(navs, function(i, nav) {
				var key = nav.action && nav.action.value || "";
				modules[key] = true;
			});

			$.each(lis, function(i, v) {
				var li = $(v),
					module = li.data("module");

				if (modules[module]) {
					li.removeClass("disable");
				} else {
					module != "cover" && li.addClass("disable");
				}
			});

			var disableModules = container.find("li.disable");
			disableModules.remove();
			container.append(disableModules);
		}
	});


	new TabView();
})