{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
    {%require name="app:widget/cover-skiing/skiing.scss"%}］

    <div class="mp-page-content mp-spot-skiing theme-bg">
        <nav class="swiper-container">
            <ul class="swiper-wrapper">
            {%foreach $tplData.navs as $item%}
                {%if $item.action.value == 'gallery' && $moduleGallery.from == 'baidulvyou'%}
                    {%$url = $moduleGallery.source.baidulvyou.url%}
                {%else%}
                    {%$url = $navCfg[$item.action.value]%}
                {%/if%}
                <li class="swiper-slide menu-bg-{%$item@index + 1%}">
                    <a href="{%$url%}" class="{%$item.action.value%}-bg">
                        <div class="text">
                            {%$itemNow = $item.action.value%}
                            <h2>{%$menuCfg.long.$itemNow.zh%}</h2>
                            <h3>{%$menuCfg.long.$itemNow.en%}</h3>
                        </div>
                        <div class="shade"></div>
                    </a>
                </li>
            {%/foreach%}
            </ul>
        </nav>
    </div>

    {%script%}
        Cpt.invoke('mp-spot-skiing', function(){
            var skiing = require('app:widget/cover-skiing/skiing.js');

            new skiing(this.container);
        });

    {%/script%}

{%/block%}


