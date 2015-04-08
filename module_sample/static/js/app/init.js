(function () {
    window._ = window._ || {};
    _.utils = require('app:static/js/core/utils.js');
    var App = require('app:static/js/app/app.js');

    var app = new App();
    var ZDH = {};

    ZDH.app = app;
})();