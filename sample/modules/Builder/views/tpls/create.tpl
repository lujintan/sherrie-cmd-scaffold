<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>景区门票模板</title>
        <script type="text/javascript" data-main="/static/builder/js/page/create.js" src="http://apps.bdimg.com/libs/require.js/2.1.9/require.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/static/builder/css/create.css">
    </head>
    <body>
        <a id="back_basic" class="return_btn" href="{%$builder_host|escape:html%}editapp/{%$sid|escape:html%}?zhida_refer={%$zhidaRefer|escape:url%}" target="_top">返回基本信息</a>
        <div>{%$global%}</div>
        <div class="mp-create-container">
            <div class="mp-create-lists-container">
                {%foreach $templates as $template%}
                    <div class="mp-create-lists" 
                    mp-tpl="{%$template@key%}" 
                    mp-title="{%$template%}" style="background:url(/static/builder/images/create/{%$template@key%}.jpg);background-size: cover;"></div>
                {%/foreach%}
                
                <div style="clear:both"></div>
            </div>
            <div class="mp-create-selected-show" >
                "请选择一个模板"
            </div>

            <div class="mp-create-selected-color">
                <!--引入模拟器-->
                {%include file="tpls/simulation.tpl"%}
                <div class="mp-create-select-color">
                    <div class="mp-color-selected">请选择颜色</div>
                    <div>
                        {%foreach $color as $color_list%}
                        <div class="mp-create-color" style="background-color:{%$color_list%};" color="{%$color_list%}"></div>
                        {%/foreach%}
                        <div style="clear:both;"></div>
                    </div><div class="test_button" style="border:1px solid #ccc;">test</div>
                </div>
                <div style="clear:both;"></div>
            </div>

            <div class="mp-create-button">
                <button class="mp-create-cancel">
                    取消
                </button>
                <button class="mp-create-nextStep">
                    下一步
                </button>
            </div>
        </div>
    
    </body>
    
</html>
