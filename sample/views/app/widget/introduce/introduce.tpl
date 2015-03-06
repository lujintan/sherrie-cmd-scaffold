{%require name="app:widget/introduce/introduce.scss"%}
<div class="mp-introduce-content">
    {%if $introduce.image %}
        <img class="mp-timg" data-timg="{'type':'src','url':'{%$introduce.image%}','size':800}" src="{%$introduce.image%}"/>
    {%/if%}
    {%if $introduce.name %}
        <h3>{%$introduce.name%}：</h3>
    {%/if%}
    {%if $introduce.detail %}
        <p>{%$introduce.detail%}</p>
    {%/if%}
    {%if $introduce.address %}
        <h3>景区地址：</h3>
        <p>{%$introduce.address%}</p>
    {%/if%}
    {%if $introduce.open %}
        <h3>景区开放时间：</h3>
        <p>{%$introduce.open%}</p>
    {%/if%}
    {%if $introduce.best %}
        <h3>最佳旅游时间：</h3>
        <p>{%$introduce.best%}</p>
    {%/if%}
    {%if $introduce.traffic && $introduce.traffic != " " %}
        <h3>交通指南：</h3>
        <p>{%$introduce.traffic%}</p>
    {%/if%}
</div>

{%script%}
        Cpt.invoke('mp-introduce-content', function(){
            var introduce = require('app:widget/introduce/introduce.js');

            new introduce(this.container);
        });
{%/script%}