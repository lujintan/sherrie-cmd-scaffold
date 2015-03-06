{%require name="app:widget/gallery/gallery.scss"%}

<div class="mp-modules-page gallery card" >
    <div class="mp-mod-body">
        {%if $moduleGallery.from === 'customer' && $moduleGallery.source.customer.items|count %}
            {%foreach $moduleGallery.source.customer.items as $index=>$val%}
                <div class="mod">
                {%if $index === 0 || $val.images.length < 3  %}
                    <div class="lgm-gallery lgm-gallery-column hd big" data-cptid="gallery-{% $index %}">
                        <div class="lgm-gallery-items">
                            <div class="lgm-gallery-item mp-timg" data-timg="{'type':'bg','url':'http://bs.baidu.com/my-cms-files/cms_3fb2db6cccf4a23383383394b28b2b31','size':400}"/>
                            </div>
                        </div>
                    </div>
                {%else%}
                    <div class="lgm-gallery lgm-gallery-column hd" data-cptid="gallery-{% $index %}">
                        <div class="lgm-gallery-items">
                    {%foreach $val.images as $imgIndex=>$img%}
                        {%if $imgIndex < 3 %}
                            {% $opts = json_decode(array('type' => 'bg', 'url' => $img.url, 'size' => 400,));%}
                            <div class="lgm-gallery-item mp-timg" data-timg="{% $opts %}"></div>
                        {%/if%}
                     {%/foreach%}
                        </div>
                    </div>
                {%/if%}
                </div>
                <div class="bd">
                    <div class="title">
                        <span class="label theme-bg-color">图集</span>
                        <h2 class="lgm-gallery-title-info">{%$val.name %}</h2>
                    </div>
                </div>
            {%/foreach%}
        {%/if%}
    </div>
</div>
{%script%}
    Cpt.invoke('gallery', function(){
        var gallery = require('app:widget/gallery/gallery.js');

        new gallery(this.container);
    });
{%/script%}


