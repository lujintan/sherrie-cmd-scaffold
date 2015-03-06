/**
 * @author gaojiexuan@baidu.com
 *
 * 每位工程师都有保持代码优雅的义务
 */

(function () {
    window._ = window._ || {};
    _.utils = require('app:static/js/core/utils.js');

    var App = require('app:static/js/app/app.js');
    var app = new App();

    var ZDH = {};
    ZDH.app = app;
})();