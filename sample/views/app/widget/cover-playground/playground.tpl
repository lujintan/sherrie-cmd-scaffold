{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
    {%require name="app:widget/cover-playground/playground.scss"%}
    <div class="mp-page-content mp-spot-playground theme-bg">
        <div class="nav-bg theme-bg"></div>
        <div class="nav-bg-layer"></div>
        <div class="nav-container">
            {%foreach $tplData.navs as $item%}
                <div class="mod-block mod-{%$item@index%}" data-delay="{%$item@index*300%}">
                    <a href="{%$navCfg[$item.action.value]%}">
                        <div class="icon-cover-layer1"></div>
                        <div class="icon-cover-layer2"></div>
                        <em></em>
                        <img src="/static/mobile/image/common/{%$item.action.value%}.png" />
                        <span>{%$item.text%}</span>
                    </a>
                </div>
            {%/foreach%}
        </div>
    </div>

    {%script%}
        Cpt.invoke('mp-spot-playground', function(){
            var playground = require('app:widget/cover-playground/playground.js');

            new playground(this.container);
        });
    {%/script%}

{%/block%}


