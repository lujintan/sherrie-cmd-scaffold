{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
{%require name="app:widget/cover-oldtown/oldtown.scss"%}
    <div class="mp-page-content mp-spot-oldtown">
        <div class="nav-bg theme-bg"></div>
        <div class="nav-bg-layer"></div>
        <div class="nav-container">
                {%foreach $tplData.navs as $item%}
                <div class="mod-block menu-bg-{%$item@index%} {%$item.action.value%}-bg" data-delay="{%$item@index*300%}">
                    <a href="{%$navCfg[$item.action.value]%}">
                        <div class="nav-list-bg">
                            <div class="icon-cover-layer1 color-{%$item@index%5%}"></div>
                            <div class="icon-cover-layer2 color-r-{%$item@index%5%}"></div>
                        </div>
                        <div class="nav-list">
                            <img src="/static/mobile/image/common/{%$item.action.value%}.png" />
                            <div class="text">
                                {%$itemNow = $item.action.value%}
                                <h2>{%$menuCfg.long.$itemNow.zh%}</h2>
                                <h3>{%$menuCfg.long.$itemNow.en%}</h3>
                            </div>
                        </div>
                    </a>
                </div>
                {%/foreach%}
        </div>
    </div>
    {%script%}
        Cpt.invoke('mp-spot-oldtown', function(){
            var oldtown = require('app:widget/cover-oldtown/oldtown.js');

            new oldtown(this.container);
        });
    {%/script%}
{%/block%}

