define(['template/dialog', 'underscore', 'jquery'], function(dialogTpl) {

	var combile = _.template(dialogTpl.tpl),
		Dialog = function(optons) {

			optons = optons || {};
			this.cb = optons.cb;
			this.ok = optons.ok;
			this.cancel = optons.cancel;
			this.content = optons.content || "";
			this.isShow = typeof(optons.isShow) == "undefined" ? true : optons.isShow;
			this.showClose = typeof(optons.showClose) == "undefined" ? true : optons.showClose;
			this.topArrow = optons.topArrow || false;
			this.position = optons.position || {};
			this.mask = typeof(optons.mask) == "undefined" ? true : optons.mask;
			this.size = {
				width: optons.width || "100px",
				height: optons.height || "100px"
			}
			this.title = optons.title;

			this.container = $("<div class='mp-manage-dialogBox'></div>");
			this.dom = {};

			this.init();
		},
		Fn = Dialog.prototype;


	Fn.init = function() {

		this.render();
		this.bindEvent();
	}

	Fn.render = function() {
		var data = {
				title: this.title || ""
			},
			html = $(combile(data));
		this.container.html(html);

		this.dom.dialogContainer = this.container.find("div[node-type=dialogContainer]");
		this.dom.content = this.container.find("div[node-type=content]");
		this.dom.mask = this.container.find("div[node-type=mask]");
		this.dom.closebox = this.container.find('span[node-type="close"]');

		this.dom.content.append(this.content);
		// this.dom.dialogContainer.css(this.size);
		if (this.mask) {
			this.dom.mask.show();
		} else {
			this.dom.mask.hide();
		}

		this.topArrow && this.dom.dialogContainer.addClass("mp-manage-dialog-arrow");
		!this.showClose && this.dom.closebox.hide();
		this.isShow && this.show();
		$("body").append(this.container);

		this.cb && this.cb(this.dom.content);
		var that = this;

		this.setPostion(this.position);
	}

	Fn.fresh = function() {
		this.setPostion({});
	}

	Fn.setPostion = function(position) {
		if (!position.left || !position.top) {
			var dom = this.dom,
				container = this.container,
				dialogContainer = dom.dialogContainer,
				width = dialogContainer.width(),
				height = dialogContainer.height(),
				screenWidth = container.width(),
				screenHight = container.height(),
				left = (screenWidth - width) / 2,
				top = (screenHight - height) / 2 - 100;

			position = {
				left: left > 0 ? left : 0,
				top: top > 0 ? top : 0
			}
		}

		this.dom.dialogContainer.css(position);
	}

	Fn.bindEvent = function() {
		var that = this;
		this.container.delegate('span[node-type="close"]', "click", function(e) {
			that.close();
		});
		this.container.delegate('[nodetype="okbutton"]', "click", function(e) {
			var isClose = that.ok && that.ok();
			if (isClose !== false) {
				that.close();
			}
		});
		this.container.delegate('[nodetype="cancelbutton"]', "click", function(e) {
			that.cancel && that.cancel();
			that.close();
		});
	}

	Fn.show = function(html) {
		this.container.show();
		html && this.dom.content.html(html);
	}

	Fn.close = function() {
		this.container.hide();
	}

	Fn.getContainer = function() {
		return this.container;
	}

	Fn.destroy = function() {
		this.container.remove();
	}

	return Dialog;
})