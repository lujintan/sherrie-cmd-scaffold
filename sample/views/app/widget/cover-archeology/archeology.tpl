{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
    {%require name="app:widget/cover-archeology/archeology.scss"%}
    <div class="mp-page-content mp-spot-archeology">
        <div class="theme-bg"></div>
        <nav>
            <ul>
            {%foreach $tplData.navs as $item%}
                {%if $item.action.value == 'gallery' && $moduleGallery.from == 'baidulvyou'%}
                    {%$url = $moduleGallery.source.baidulvyou.url%}
                {%else%}
                    {%$url = $navCfg[$item.action.value]%}
                {%/if%}
                <li class="{%$item.action.value%}-bg">
                    <a href="{%$url%}">
                        <div class="text">
                            <h2><span class="zh">{%$menuCfg.long[$item.action.value].zh%}</span><span class="en">{%$menuCfg.long[$item.action.value].en%}</span></h2>
                        </div>
                        <div class="shade"></div>
                    </a>
                </li>
            {%/foreach%}
            </ul>
        </nav>
    </div>
    {%script%}
        Cpt.invoke('mp-spot-archeology', function(){
            var archeology = require('app:widget/cover-archeology/archeology.js');

            new archeology(this.container);
        });
    {%/script%}
{%/block%}

