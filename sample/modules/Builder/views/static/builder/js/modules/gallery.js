define(['jquery', 'extensions/lightapi', 'backbone', 'widget/atlas'], function(jquery, lightapi, backbone,atlas) {
	var GalleryModel = backbone.Model.extend({
		defaults: {
			from: "baidulvyou",
			source: {
				baidulvyou: {
					url: ""
				},
				customer:{}
			}
		}
	})

	var Gallery = backbone.View.extend({

		events: {
			'click div[node-type="radio"]': "selectChangeHandler",
			'click button[node-type="baidulvyousubmit"]': "updateGallaries",
			'change select[node-id=dataSelect]' : "selectChange"
		},

		initialize: function(config) {
			var _conf = $.extend(true, {}, config), that = this, el = $(this.el);
			this.dom = {};
			this.dom.baidulvyou = el.find("[node-id=baidulvyou]");
			this.dom.customer = el.find("[node-id=customer]");

			this.dom.baidulvyouRadio = el.find("[node-id=baidulvyouRadio]");
			this.dom.customerRadio = el.find("[node-id=customerRadio]");
			this.dom.dataselect = el.find("[node-id=dataSelect]");

			this.model.on("change:from", function(original, value){
				that.changeTab(value);
			});

			this.render();
			this.initAtlas();

			this.initCount();
		},

		initCount:function(){
			var el = this.el;
			require(['extensions/count'], function(count){
				count.init(el);
			})
		},

		initAtlas:function(){
			var data = this.model.get("source"), dom = this.dom;
			this.atlas = atlas.getAtlasInstance({
				container:dom.customer,
				data:data.customer
			});
		},

		render: function() {
			var model = this.model, from = this.model.get("from")||"baidulvyou", source = null;
			if (from == "baidulvyou") {
				this.dom.baidulvyouRadio.addClass("checked");
				this.dom.baidulvyou.show().siblings().hide();
				source = model.get("source");
				this.dom.dataselect.val(source.baidulvyou&&source.baidulvyou.url);
			} else {
				this.dom.customerRadio.addClass("checked");
				this.dom.customer.show().siblings().hide();
			}
		},

		selectChangeHandler:function(e) {
			var target = $(e.currentTarget), selection = target.data("selection");

			this.model.set("from", selection);
		},

		changeTab: function(selection) {
			var dom = this.dom;

			if (selection == "baidulvyou") {
				dom.baidulvyou.show();
				dom.customer.hide();
				dom.baidulvyouRadio.addClass("checked").siblings().removeClass("checked");
			} else {
				dom.baidulvyou.hide();
				dom.customer.show();
				dom.customerRadio.addClass("checked").siblings().removeClass("checked");
			}

			lightapi.set("modules.gallery.from", selection, function(err, res){
				if (err) {
					console.log(err);
				}
			})
		},

		selectChange:function(e){
			var target = $(e.target), url = target.val(),data = this.model.get("source");
			data.baidulvyou = {};
			data.baidulvyou.url = url;
		},

		updateGallaries: function() {
			var data = this.model.toJSON();

			lightapi.setValue("modules.gallery", data, function(err, res){
				if (err) {
					console.log(err);
				} else {
					window.BuilderEvent && window.BuilderEvent.fire("modulepreview", "gallery", true);
				}
			})
		}

	})


	var gallery = null;

	function init() {
		window.BuilderEvent.addEventListener("moduleselect", function(moduleName) {
			if (moduleName && moduleName == "gallery") {
				gallery == null && lightapi.get("modules.gallery", function(err, res) {
					if (err == null) {
						res = res || {};
						gallery = new Gallery({
							model: new GalleryModel(res),
							el: $("#mp-manage-gallery")
						});
					}
				})
			}
		})
	}

	init();
})