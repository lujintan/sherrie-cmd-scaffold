var utils = {
    log: function (type, log) {
        clouda.lego.monitor.send("click",{
            name: "call",
            value: log
        });
    },

    unParam: function (str) {
        var re = {};

        if (str) {
            str = str.split('&');
            _.each(str, function(item) {
                item = item.split('=');
                re[item[0]] = item[1];
            });
        }

        return re;
    },

    getRealPathname: function () {
        return window.location.pathname.replace(/\//gi, '');
    }
};

module.exports = utils;
