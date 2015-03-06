{%extends file="../cover-base/cover.tpl"%}

{%block name="cover_content"%}
    {%require name="app:widget/cover-landscape/landscape.scss"%}

    <style>
        .theme-bg {
            background-image: url({%$tplData.style.backgroundImg|default:('/static/app/widget/cover-'|cat:$tplType|cat:'/img/bg.jpg')%});
        }
        {%foreach $tplData.navs as $item%}
            .{%$item.action.value%}-bg{
                background-image: url({%$item.image|default:('/static/app/widget/cover-'|cat:$tplType:'/img/'|cat:'/menu_bg_'|cat:($item@index+1)|cat:'.jpg')%});
            }
        {%/foreach%}
    </style>

    <div class="mp-page-content mp-spot-landscape theme-bg">
        <nav class="swiper-container">
            <ul class="swiper-wrapper">
            {%foreach $tplData.navs as $item%}
                {%if $item.action.value == 'gallery' && $moduleGallery.from == 'baidulvyou'%}
                    {%$url = $moduleGallery.source.baidulvyou.url%}
                {%else%}
                    {%$url = $item.action.value%}
                {%/if%}
                <li class="swiper-slide {%$item.action.value%}-bg" data-delay='{%$item@index*300%}'>
                    <a href="/{%$url%}/?{%$apptoken%}" class="{%$item.action.value%}-bg" {%if $item.action.value == 'gallery' || $item.action.value == 'introduce'%} data-area="pre_load" {%/if%}>
                        <span class="cover-layer color-{%$item@index%5%}"></span>
                        <div class="text">
                            {%$itemNow = $item.action.value%}
                            <h2>{%$menuCfg.short.$itemNow.zh%}</h2>
                            <h3>{%$menuCfg.short.$itemNow.en%}</h3>
                        </div>
                    </a>
                </li>
            {%/foreach%}
            </ul>
        </nav>
    </div>


    {%script%}
        Cpt.invoke('mp-spot-landscape', function(){
            var landscape = require('app:widget/cover-landscape/landscape.js');

            new landscape(this.container);
        });
    {%/script%}
{%/block%}