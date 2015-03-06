

require(['modules/loadtpldata', 'page/manageapp'], function (loadtpldata_val, App) {
    loadtpldata_val.initappdata({
        renderapp:function () {
            App.init();
        }
    })
})