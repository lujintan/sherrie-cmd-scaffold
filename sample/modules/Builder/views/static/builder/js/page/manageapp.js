define(['extensions/listener',], function(listener) {

    var events = [
        'moduleschange', //模块选择
        'modulesave', // 模块保存
        'modulepreview', //预览  args ：eventName moduleName isFresh
        'citylist',  //城市接口数据
        'moduleselect',   //选择模块
        'publish',      // 点击完成触发  
        'ticketlist'    //门票结果页
    ];

    listener.initListener(events);

    return {
        init: function() {

            //load modules
            require(['modules/bar']);
            require(['modules/tab']);
            require(['modules/selectmodule']);
            require(['modules/gallery']);
            require(['modules/routes']);
            require(['modules/simulation']);
            require(['modules/tourguide']);
            require(['modules/introduce']);
            require(['modules/tickets']);
            require(['modules/spotlist']);
            require(['modules/weather']);
            require(['modules/heatmap']);
        }
    }
})