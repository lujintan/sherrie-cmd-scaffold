{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
    {%require name="app:widget/cover-hotspring/hotspring.scss"%}
    <div class="mp-spot-hotspring">
        <div class="mp-hotspring-layer"></div>
        <div class="mp-hotspring-bg theme-bg"></div>
        <div class="mp-spot-content">
            <div class="mp-spot-title">{%if !$tplData.isBox %}{%$setting.name%}{%/if%}</div>
            <div class="mp-spot-nav">

                <ul>
                    {%foreach $tplData.navs as $item%}
                    {%if $item@index != 0 && $item@index%2 == 0%}
                    </ul>
                    <ul>
                    {%/if%}
                    <li>
                        <a href="{%$navCfg[$item.action.value]%}">
                            <em></em>
                            <img src="/static/mobile/image/common/{%$item.action.value%}.png" />
                        </a>
                        <span>{%if $item.action.value == heatmap %}热力图{%else%}{%$item.text%}{%/if%}</span>
                    </li>
                    {%if $item@last && $item@index%2 == 0%}
                    <li>
                        <span class="fixed">
                            <i class="fixed"></i>
                        </span>
                    </li>
                    {%/if%}
                    {%/foreach%}
                </ul>
            </div>
        </div>
    </div>

    {%script%}
        Cpt.invoke('mp-spot-hotspring', function(){
            var hotspring = require('app:widget/cover-hotspring/cover-hotspring.js');

            new hotspring(this.container);
        });

    {%/script%}

{%/block%}

