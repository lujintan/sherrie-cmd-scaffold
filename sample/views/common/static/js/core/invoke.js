;(function($){

    var Cpt = window.Cpt = {};

    //组件容器 目前无实际用途 可用于调试
    Cpt.list = [];

    Cpt.emptyFn = function(){};

    //根据组件标识 获取组件容器
    //组件标识命名规则 包名-组件名
    Cpt._getContainers = function(tag){

        if(!tag){
            return [];
        }

        var containers = [];

        $('.' + tag).forEach(function(rawContainer){
            // if($(rawContainer).hasClass('lgmitem')){
            containers.push(rawContainer);
            // }
        });

        return containers;

    };

    Cpt._Cpt = function(fn, container){
        this.fn = fn;
        this.container = container;
        /*var me = this;
        //在组件容器的约束下获取组件元素
        this.$ = function(selector){
            return $(selector, me.container);
        };*/
    };

    //挂proto上 调用时始终需要依赖对象 如: me.$('.lego')
    Cpt._Cpt.prototype.$ = function(selector){
        return $(selector, this.container);
    };

    Cpt.invoke = function(tag, fn){
        $(function () {
            var containers = Cpt._getContainers(tag);

            $(containers).forEach(function(container){
                var invoked = 0;
                try{
                    invoked = parseInt($(container).data('invoked'));
                }catch(e){}

                //一种组件只允许一个Cpt.invoke调用 blendui异步加载重复调用
                if(invoked === 1){
                    console.log('already invoked');
                    return;
                }

                var aCpt = new Cpt._Cpt(fn || Cpt.emptyFn, container);
                Cpt.list.push(aCpt);
                //fis将调用js都下移至底部 此处可直接调用
                aCpt.fn.call(aCpt);
                $(container).data('invoked', 1);
            });
        });
    };

})(Zepto);
