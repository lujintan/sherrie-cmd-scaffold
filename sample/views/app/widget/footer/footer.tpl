{%require name="app:widget/footer/footer.scss"%}
<div class="mp-modules-footer">
    <ul>
        <li>
            <a hidefocus="true" href="tel:010-58005069">客服电话</a>
        </li>
        <li>
            <a hidefocus="true" href="/app/tickets?{%$apptoken%}">我要订票</a>
        </li>
    </ul>
</div>

{%script%}
    Cpt.invoke('mp-modules-footer', function(){
        var footer = require('app:widget/footer/footer.js');
        new footer(this.container);
    });
{%/script%}